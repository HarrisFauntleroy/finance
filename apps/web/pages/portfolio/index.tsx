import React from "react";

import { Page } from "../../components/Layout/Page";

import Accounts from "./accounts";
import Overview from "./overview";
import Statistics from "./statistics";
import Transactions from "./transactions";

import { ChartPieSlice, Gauge, Receipt, Wallet } from "@phosphor-icons/react";
import Tabs from "../../components/Tabs";

const Portfolio = () => {
  const tabsData = [
    {
      value: "overview",
      label: "Overview",
      icon: <Gauge />,
      component: <Overview />,
    },
    {
      value: "accounts",
      label: "Accounts",
      icon: <Wallet />,
      component: <Accounts />,
    },
    {
      value: "transactions",
      label: "Transactions",
      icon: <Receipt />,
      component: <Transactions />,
    },
    {
      value: "statistics",
      label: "Statistics",
      icon: <ChartPieSlice />,
      component: <Statistics />,
    },
  ];

  return (
    <Page title="Portfolio">
      <Tabs tabs={tabsData} />
    </Page>
  );
};

Portfolio.auth = true;
export default Portfolio;
