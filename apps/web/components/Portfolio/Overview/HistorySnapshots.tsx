import { Stack, Text } from "@mantine/core";
import { ChartData } from "chart.js";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { trpc } from "../../../utils/trpc";
import { Card } from "../../Layout/Card";
import { Table } from "../../MantineTable";

const Bar = dynamic(() => import("react-chartjs-2").then(({ Bar }) => Bar), {
  ssr: false,
});

export const HistorySnapshots = () => {
  const session = useSession();
  const userId = session?.data?.userId;

  const { data: historyData } = trpc.assets.historyByUserId.useQuery({
    userId: userId || "",
  });

  const tableData = [...(historyData?.portfolioSnapshot || [])];

  const data = useMemo(
    () =>
      historyData?.portfolioSnapshot.map(({ totalValue, createdAt }) => ({
        value: totalValue,
        label: format(new Date(createdAt), "dd MMM"),
      })),
    [historyData?.portfolioSnapshot]
  );

  const newData = useMemo((): ChartData<"bar", unknown, unknown> => {
    return {
      labels: data?.filter((d) => d.label).map((d) => d.label),
      datasets: [
        {
          label: "Portfolio Value",
          data: data?.filter((d) => d.value).map((d) => d.value) || [],
        },
      ],
    };
  }, [data]);

  return (
    <Card>
      <Stack>
        <Text variant="h3">History Snapshots</Text>
        <Table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Total Value</th>
              <th>Base Currency</th>
              <th>Quantity</th>
              <th>Quantity Filled</th>
              <th>Fee</th>
              <th>Fee Currency</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {tableData?.map((row) => (
              <tr key={row.id}>
                <td>{format(new Date(row.createdAt), "dd MMM")}</td>
                <td>{row.totalValue}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Bar data={newData} />
      </Stack>
    </Card>
  );
};
