import { trpc } from "../../../utils/trpc";

import { Card, Loader, Table, Text } from "@mantine/core";
import { useSession } from "next-auth/react";
import Currency from "../../Currency";

function OverviewCard() {
  const session = useSession();
  const userId = session?.data?.userId;

  if (!userId) return <Text>Please log in to view this information.</Text>;
  const { data, isLoading, error } = trpc.assets.overviewByUserId.useQuery({
    userId,
  });

  if (isLoading) return <Loader />;
  if (error) return <Text>Error loading data</Text>;

  return (
    <Card h="100%">
      <Table h="100%">
        <tbody>
          <tr>
            <th>Value</th>
            <td>
              <Currency value={data?.totalValue} />
            </td>
          </tr>
          <tr>
            <th>Cost Basis</th>
            <td>
              <Currency value={data?.totalCostBasis} />
            </td>
          </tr>
          <tr>
            <th>Unrealized Gains</th>
            <td>
              <Currency value={data?.unrealisedGain} />
            </td>
          </tr>
          <tr>
            <th>Realized Gains</th>
            <td>
              <Currency value={0} />
            </td>
          </tr>
          <tr>
            <th>Saleable Assets</th>
            <td>
              <Currency value={data?.saleableValue} />
            </td>
          </tr>
        </tbody>
      </Table>
    </Card>
  );
}

export default OverviewCard;
