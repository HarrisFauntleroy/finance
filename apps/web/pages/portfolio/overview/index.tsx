import { SimpleGrid } from "@mantine/core";
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
    <SimpleGrid cols={1}>
      <SimpleGrid cols={2}>
        <OverviewCard />
        <AllocationPieChart />
      </SimpleGrid>
      <NetWorthCostBasisChart />
      <OverviewAccountsList />
      <HistorySnapshots />
    </SimpleGrid>
  );
}

Overview.auth = true;
export default Overview;
