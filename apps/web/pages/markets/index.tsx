import React from "react";

import CryptoComparison from "../../components/Markets/CryptoComparison";
import { Cryptocurrency } from "../../components/Markets/Cryptocurrency";
import { Forex } from "../../components/Markets/Forex";
import { Page } from "../../components/Layout/Page";
import { IconCurrencyBitcoin } from "@tabler/icons-react";
import { CurrencyDollar } from "@phosphor-icons/react";
import { MdCompare } from "react-icons/md";
import Tabs from "../../components/Tabs";

const Markets = () => {
  const tabsData = [
    {
      value: "overview",
      label: "Cryptocurrency",
      icon: <IconCurrencyBitcoin />,
      component: <Cryptocurrency />,
    },
    {
      value: "budgets",
      label: "Forex",
      icon: <CurrencyDollar />,
      component: <Forex />,
    },
    {
      value: "compare",
      label: "Compare",
      icon: <MdCompare />,
      component: <CryptoComparison />,
    },
  ];

  return (
    <Page title="Markets">
      <Tabs tabs={tabsData} />
    </Page>
  );
};

Markets.auth = false;
export default Markets;
