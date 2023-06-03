import { CurrencyDollar } from "@phosphor-icons/react";
import { IconCurrencyBitcoin } from "@tabler/icons-react";
import { MdCompare } from "react-icons/md";
import { Page } from "../../components/Layout/Page";
import CryptoComparison from "../../components/Markets/CryptoComparison";
import { Cryptocurrency } from "../../components/Markets/Cryptocurrency";
import { Forex } from "../../components/Markets/Forex";
import Tabs from "../../components/Tabs";
import { StockTicker } from "../../components/Ticker";

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
      <StockTicker />
      <Tabs tabs={tabsData} />
    </Page>
  );
};

Markets.auth = false;
export default Markets;
