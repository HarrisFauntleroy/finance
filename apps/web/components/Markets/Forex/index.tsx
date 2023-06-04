import { Avatar, Flex, Text } from "@mantine/core";
import { formatDuration, intervalToDuration } from "date-fns";
import Link from "next/link";
import Currency from "../../../components/Currency";
import { trpc } from "../../../utils/trpc";
import { Card } from "../../Layout/Card";
import { Table } from "../../MantineTable";

export const Forex = () => {
  const { data } = trpc.markets.forex.useQuery();

  return (
    <Card>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Currency</th>
            <th>Ticker</th>
            <th>Price</th>
            <th>24h</th>
            <th>24h%</th>
            <th>Market Cap Rank</th>
            <th>Market Cap</th>
            <th>Last Update</th>
          </tr>
        </thead>
        {data?.map((item) => (
          <tr key={item.id}>
            <td>
              <Flex align="center" gap="8px">
                <Link
                  href={{
                    pathname: `/markets/crypto/${item.name}`,
                    query: {
                      name: item.name,
                      ticker: item.ticker,
                    },
                  }}
                  passHref
                >
                  <Avatar
                    size="sm"
                    src={item.image || ""}
                    bg="transparent
								"
                  />
                </Link>
              </Flex>
            </td>
            <td>
              <Text>{item.currency?.toUpperCase()}</Text>
            </td>
            <td>
              <Text>{item.ticker?.toUpperCase()}</Text>
            </td>
            <td>
              <Currency value={item.price} />
            </td>
            <td>
              <Currency value={item.priceChange24h} />
            </td>
            <td>{item.priceChange24hPercent}%</td>
            <td>{item.marketCapRank}</td>
            <td>
              <Currency value={item.marketCap} />
            </td>
            <td>
              {formatDuration(
                intervalToDuration({
                  start: new Date(),
                  end: new Date(item?.updatedAt),
                }),
                {
                  format: ["hours", "minutes"],
                  delimiter: ", ",
                }
              )}
            </td>
          </tr>
        ))}
      </Table>
    </Card>
  );
};
