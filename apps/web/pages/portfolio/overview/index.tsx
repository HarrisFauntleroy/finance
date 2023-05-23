import { Grid, Group } from "@mantine/core";
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
import { OverviewAccountsList } from "../../../components/Portfolio/Overview/AccountsList";
import { AllocationPieChart } from "../../../components/Portfolio/Overview/AllocationPieChart";
import { HistorySnapshots } from "../../../components/Portfolio/Overview/HistorySnapshots";
import { NetWorthCostBasisChart } from "../../../components/Portfolio/Overview/NetWorthCostBasisChart";
import OverviewCard from "../../../components/Portfolio/Overview/OverviewCard";

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

function Overview() {
  return (
    <Grid grow maw="100%">
      <Grid.Col span={6}>
        <Group grow>
          <OverviewCard />
          <AllocationPieChart />
        </Group>
      </Grid.Col>
      <Grid.Col span={12}>
        <NetWorthCostBasisChart />
      </Grid.Col>
      <Grid.Col span={12}>
        <OverviewAccountsList />
      </Grid.Col>
      <Grid.Col span={12}>
        <HistorySnapshots />
      </Grid.Col>
    </Grid>
  );
}

Overview.auth = true;
export default Overview;
