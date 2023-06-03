import {
  Avatar,
  Box,
  Divider,
  Flex,
  HStack,
  Heading,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Card } from "@mantine/core";
import { divide, multiply, subtract } from "common";
import currency from "currency.js";
import Image from "next/image";
import { useMemo, useState } from "react";
import { trpc } from "../../utils/trpc";
import { Grid } from "../Grid";

const currencies = ["USD", "EUR", "GBP", "JPY"];

type CryptoToCompare = {
  name: string | null;
  updatedAt: Date;
  ticker: string;
  currency: string;
  price: string | null;
  priceChange24h: string | null;
  priceChange24hPercent: string | null;
  marketCap: string | null;
  marketCapRank: string | null;
  image: string | null;
};

const CryptoComparison = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");
  const [coinToCompare, setcoinToCompare] = useState<CryptoToCompare>();
  const [, setCoinToCompareAgainst] = useState<CryptoToCompare>();

  const handleSelectCrypto1 = (crypto: CryptoToCompare) => {
    setcoinToCompare(crypto);
  };

  const handleSelectCrypto2 = (crypto: CryptoToCompare) => {
    setCoinToCompareAgainst(crypto);
  };

  const handleSelectCurrency = (input: string) => {
    setSelectedCurrency(input);
  };

  const { data } = trpc.markets.cryptocurrency.useQuery();

  const calculatedValues = useMemo(
    () =>
      data?.map((crypto) => {
        const potentialPrice = multiply(
          divide(String(crypto?.marketCap), String(coinToCompare?.marketCap)),
          String(coinToCompare?.price)
        );

        const potentialUpside = multiply(
          divide(
            subtract(potentialPrice, String(crypto.price)),
            String(crypto.price)
          ),
          -100
        );

        return {
          potentialPrice,
          potentialUpside,
          ...crypto,
        };
      }),
    [coinToCompare?.marketCap, coinToCompare?.price, data]
  );

  return (
    <Grid
      padding="8px"
      gridTemplateColumns={{
        md: "1fr max-content",
        base: "100%",
      }}
    >
      <Card padding="8px">
        <Heading>Crypto Comparison</Heading>
        <Flex>
          <Select
            width="100%"
            defaultValue={coinToCompare?.ticker}
            onChange={(event) => {
              const { value } = event.target;
              const firstCrypto = data?.[Number(value)];
              if (firstCrypto) {
                handleSelectCrypto1(firstCrypto);
              }
            }}
          >
            {data?.map((crypto, index) => (
              <option value={index} key={crypto.ticker}>
                <HStack alignItems="center">
                  {crypto.image && (
                    <Image
                      width={1}
                      height={1}
                      alt="crypto logo"
                      src={crypto.image}
                    />
                  )}
                  <Text>
                    {crypto.name} ({crypto.ticker})
                  </Text>
                </HStack>
              </option>
            ))}
          </Select>

          <Select
            width="100px"
            defaultValue={selectedCurrency}
            onChange={(e) => handleSelectCurrency(e.target.value)}
          >
            {currencies.map((currencyOption) => (
              <option value={currencyOption} key={currencyOption}>
                {currencyOption}
              </option>
            ))}
          </Select>
        </Flex>
        <Text fontSize={32}>
          What if {coinToCompare?.ticker} reached the market cap of...
        </Text>
        <Stack width="100%">
          {calculatedValues?.map((crypto) => (
            <Flex key={crypto.ticker} justify="space-between" align="center">
              <Flex align="center">
                <Box>{String(crypto?.marketCapRank)}</Box>
                <Avatar src={crypto.image || ""} name={crypto.ticker} />
                <Stack alignItems="center">
                  <Text textTransform="uppercase">{crypto.ticker}</Text>
                  <Text textTransform="capitalize">{crypto.name}</Text>
                </Stack>
                <Box>{currency(String(crypto?.marketCap)).format()}</Box>
              </Flex>
              <Box width="300px">
                <Flex>
                  <>
                    Current {crypto?.ticker} Price: {crypto?.price}
                  </>
                </Flex>
                <Divider />
                <Flex>
                  Potential Price: {currency(crypto?.potentialPrice).format()}
                </Flex>
                <Divider />
                <Flex>Potential Upside: {crypto?.potentialUpside}%</Flex>
              </Box>
            </Flex>
          ))}
        </Stack>
      </Card>
      <Card>
        <label htmlFor="select">Select Crypto to compare</label>
        <select
          id="select"
          onChange={(event) => {
            const { value } = event.target;
            const secondCrypto = data?.[Number(value)];
            if (secondCrypto) {
              handleSelectCrypto2(secondCrypto);
            }
          }}
        >
          {data?.map((crypto, index) => (
            <option value={index} key={crypto.ticker}>
              {crypto.ticker}
            </option>
          ))}
        </select>
      </Card>
    </Grid>
  );
};

export default CryptoComparison;
