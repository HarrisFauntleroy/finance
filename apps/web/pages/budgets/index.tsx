import {
  ChartPieSlice,
  Gauge,
  PiggyBank,
  Receipt,
} from "@phosphor-icons/react";
import { BudgetsList } from "../../components/Budget/BudgetsList";
import { BudgetOverview } from "../../components/Budget/Overview";
import { Statistics } from "../../components/Budget/Statistics";
import { TransactionsList } from "../../components/Budget/Transactions";
import { Page } from "../../components/Layout/Page";
import Tabs from "../../components/Tabs";

function Budgets() {
  const tabsData = [
    {
      value: "overview",
      label: "Overview",
      icon: <Gauge />,
      component: <BudgetOverview />,
    },
    {
      value: "budgets",
      label: "Budgets",
      icon: <PiggyBank />,
      component: <BudgetsList />,
    },
    {
      value: "transactions",
      label: "Transactions",
      icon: <Receipt />,
      component: <TransactionsList />,
    },
    {
      value: "statistics",
      label: "Statistics",
      icon: <ChartPieSlice />,
      component: <Statistics />,
    },
  ];
  return (
    <Page title="Budgets">
      <Tabs tabs={tabsData} />
    </Page>
  );
}

Budgets.auth = true;
export default Budgets;
