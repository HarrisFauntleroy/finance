/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState } from "react"

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
} from "@chakra-ui/react"
import { divide, multiply, subtract } from "common"
import currency from "currency.js"
import Image from "next/image"
import { Card, Grid } from "ui"
import { trpc } from "~/utils/trpc"

interface Crypto {
	name: string
	ticker: string
	marketCap: number
	price: number
	potentialPrice?: number
	potentialUpside?: number
}

const currencies = ["USD", "EUR", "GBP", "JPY"]

const CryptoComparison = () => {
	const [selectedCurrency, setSelectedCurrency] = useState<string>("USD")
	const [coinToCompare, setcoinToCompare] = useState<Crypto>()
	const [, setCoinToCompareAgainst] = useState<Crypto>()

	const handleSelectCrypto1 = (crypto: Crypto) => {
		setcoinToCompare(crypto)
	}

	const handleSelectCrypto2 = (crypto: Crypto) => {
		setCoinToCompareAgainst(crypto)
	}

	const handleSelectCurrency = (input: string) => {
		setSelectedCurrency(input)
	}

	const { data } = trpc.markets.cryptocurrency.useQuery()

	const calculatedValues = useMemo(
		() =>
			data?.map((crypto) => {
				const potentialPrice = multiply(
					divide(String(crypto?.marketCap), String(coinToCompare?.marketCap)),
					String(coinToCompare?.price)
				)

				const potentialUpside = multiply(
					divide(
						subtract(potentialPrice, String(crypto.price)),
						String(crypto.price)
					),
					-100
				)

				return {
					potentialPrice,
					potentialUpside,
					...crypto,
				}
			}),
		[coinToCompare?.marketCap, coinToCompare?.price, data]
	)

	return (
		<Stack>
			<Grid
				padding="8px"
				gridTemplateColumns={{
					sm: "1fr max-content",
					base: "1fr",
				}}
			>
				<Card padding="8px">
					<Heading>Crypto Comparison</Heading>
					<Flex>
						<Select
							width="100%"
							defaultValue={coinToCompare?.ticker}
							onChange={(e) =>
								// eslint-disable-next-line @typescript-eslint/no-explicit-any
								handleSelectCrypto1(
									(data as Record<string, any>)[e.target.value]
								)
							}
						>
							{data?.map((crypto, index) => (
								<option value={index} key={crypto.ticker}>
									<HStack alignItems="center">
										<Image
											width={1}
											height={1}
											alt=""
											src={crypto.image || crypto.name || ""}
										/>
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
					<label>Select Crypto to compare</label>
					<select
						onChange={(e) =>
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							handleSelectCrypto2(
								(data as Record<string, any>)?.[e.target.value]
							)
						}
					>
						{data?.map((crypto, index) => (
							<option value={index} key={crypto.ticker}>
								{crypto.ticker}
							</option>
						))}
					</select>
				</Card>
			</Grid>
		</Stack>
	)
}

export default CryptoComparison
