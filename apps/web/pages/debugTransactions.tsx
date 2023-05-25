import { AssetBuilder, calculateTransactions } from "common";
import { trpc } from "../utils/trpc";

import { Heading } from "@chakra-ui/react";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useSession } from "next-auth/react";
import { JSONObjectViewer } from "../components/JSON";
import { Page } from "../components/Layout/Page";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const DebugTransactions = () => {
  const session = useSession();
  const userId = session.data?.userId;
  const { data: assetTransactions } = trpc.assetTransactions.byUserId.useQuery({
    userId: userId || "",
  });

  const { data: assetsById } = trpc.assets.byId.useQuery({
    id: "cldwad5ab00465avd6tpjbezj",
  });

  const asset1 = assetsById && new AssetBuilder();
  const asset2 = assetsById && new AssetBuilder(assetsById);

  return (
    <Page title="DebugTransactions" padding="8px" gap="8px">
      <Heading>Without provided Asset</Heading>
      <JSONObjectViewer data={asset1?.computedProperties} />
      <Heading>With provided Asset</Heading>
      <JSONObjectViewer data={asset2?.computedProperties} />
      <Heading>Transaction</Heading>
      <JSONObjectViewer data={assetTransactions} />
      <Heading>Calculated Transactions</Heading>
      <JSONObjectViewer data={calculateTransactions(assetTransactions || [])} />
    </Page>
  );
};

DebugTransactions.auth = false;
export default DebugTransactions;
