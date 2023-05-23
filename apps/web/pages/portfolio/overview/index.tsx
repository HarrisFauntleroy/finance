import { OverviewAccountsList } from '../../../components/Portfolio/Overview/AccountsList';

import * as ChartJs from 'chart.js';
import currency from 'currency.js';
import { AllocationPieChart } from '../../../components/Portfolio/Overview/AllocationPieChart';
import { HistorySnapshots } from '../../../components/Portfolio/Overview/HistorySnapshots';
import { NetWorthCostBasisChart } from '../../../components/Portfolio/Overview/NetWorthCostBasisChart';
import OverviewCard from '../../../components/Portfolio/Overview/OverviewCard';
import { Stack } from '@mantine/core';

ChartJs.Chart.register(
  ChartJs.CategoryScale,
  ChartJs.LinearScale,
  ChartJs.PointElement,
  ChartJs.LineElement,
  ChartJs.ArcElement,
  ChartJs.BarElement,
  ChartJs.Title,
  ChartJs.Tooltip,
  ChartJs.Legend,
  ChartJs.Filler,
);

export const options = {
  responsive: true,
  type: 'line',
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Net Worth / Cost Basis',
    },
  },
  scales: {
    y: {
      min: 0,
      // stacked: true,
      ticks: {
        // Include a dollar sign in the ticks
        callback: (value: string | number) => {
          return currency(value).format();
        },
      },
    },
  },
};

function Overview() {
  return (
    <Stack py="8px">
      <div>Overview</div>
      <OverviewCard />
      <AllocationPieChart />
      <NetWorthCostBasisChart />
      <OverviewAccountsList />
      <HistorySnapshots />
    </Stack>
  );
}

Overview.auth = true;
export default Overview;
