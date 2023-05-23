import { OverviewAccountsList } from "../../../components/Portfolio/Overview/AccountsList";

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import currency from "currency.js";
import { AllocationPieChart } from "../../../components/Portfolio/Overview/AllocationPieChart";
import { HistorySnapshots } from "../../../components/Portfolio/Overview/HistorySnapshots";
import { NetWorthCostBasisChart } from "../../../components/Portfolio/Overview/NetWorthCostBasisChart";
import OverviewCard from "../../../components/Portfolio/Overview/OverviewCard";
import { Grid } from "@mantine/core";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const options = {
  responsive: true,
  type: "line",
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Net Worth / Cost Basis",
    },
  },
  scales: {
    y: {
      min: 0,
      ticks: {
        callback: (value: string | number) => {
          return currency(value).format();
        },
      },
    },
  },
};

function Overview() {
  return (
    <Grid grow py="16px">
      <Grid.Col span={6}>
        <OverviewCard />
      </Grid.Col>
      <Grid.Col span={6}>
        <AllocationPieChart />
      </Grid.Col>
      <Grid.Col span="auto">
        <NetWorthCostBasisChart />
      </Grid.Col>
      <Grid.Col span="auto">
        <OverviewAccountsList />
      </Grid.Col>
      <Grid.Col span="auto">
        <HistorySnapshots />
      </Grid.Col>
    </Grid>
  );
}

Overview.auth = true;
export default Overview;
