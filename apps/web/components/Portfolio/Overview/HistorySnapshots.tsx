import { Card, Stack, Text } from "@mantine/core";
import { ChartData } from "chart.js";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { trpc } from "../../../utils/trpc";
import { Table } from "../../Table";
import { historySnapshotColumns } from "../columns";

const Bar = dynamic(() => import("react-chartjs-2").then(({ Bar }) => Bar), {
  ssr: false,
});

function sortFn<T extends { createdAt: Date }>(a: T, b: T) {
  if (a.createdAt < b.createdAt) {
    return -1;
  } else {
    if (a.createdAt > b.createdAt) {
      return 1;
    }
    return 0;
  }
}

export const HistorySnapshots = () => {
  const session = useSession();
  const userId = session?.data?.userId;

  const { data: historyByUserId } = trpc.assets.historyByUserId.useQuery({
    userId: userId || "",
  });

  const { data: historyData } = trpc.assets.historyByUserId.useQuery({
    userId: userId || "",
  });

  const tableData = [...(historyData?.portfolioSnapshot || [])];

  const data = useMemo(
    () =>
      historyByUserId?.portfolioSnapshot.map(({ totalValue, createdAt }) => ({
        value: totalValue,
        label: format(new Date(createdAt), "dd MMM"),
      })),
    [historyByUserId?.portfolioSnapshot]
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
        <Table
          pageSize={4}
          columns={historySnapshotColumns}
          id={"history-portfolioSnapshot"}
          // ISO8601See General principles was designed for lexicographical sort. As such the ISO8601 string representation can be sorted like any other string, and this will give the expected order
          // https://stackoverflow.com/questions/12192491/sort-array-by-iso-8601-date
          // This only works if the date includes the timezone
          data={tableData?.sort(sortFn).reverse() || []}
        />
        <Bar data={newData} />
      </Stack>
    </Card>
  );
};
