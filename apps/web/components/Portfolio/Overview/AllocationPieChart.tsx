import { Card, Loader, Text } from "@mantine/core";
import { ChartData } from "chart.js";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { trpc } from "../../../utils/trpc";

const Pie = dynamic(() => import("react-chartjs-2").then(({ Pie }) => Pie), {
  ssr: false,
});

export const AllocationPieChart = () => {
  const session = useSession();
  const userId = session?.data?.userId;
  const { isLoading, error } = trpc.assets.allocation.useQuery({
    userId: userId || "",
  });

  const data = useMemo((): ChartData<"pie", unknown, unknown> => {
    return {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  }, []);

  const options = {
    responsive: true,
    type: "pie",
    plugins: {
      legend: {
        display: false,
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Breakdown of your portfolio",
      },
    },
  };

  if (isLoading) return <Loader />;
  if (error) return <Text>Error loading data</Text>;
  return (
    <Card>
      <Pie data={data} options={options} />
    </Card>
  );
};
