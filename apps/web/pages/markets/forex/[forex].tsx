import { MarketType } from "database/generated/prisma-client";
import { useRouter } from "next/router";
import { Debug } from "../../../components/Debug";
import { Page } from "../../../components/Layout/Page";
import { trpc } from "../../../utils/trpc";

const MarketViewPage = () => {
  const { name, ticker } = useRouter().query as {
    name: string;
    ticker: string;
  };
  const marketQuery = trpc.markets.byName.useQuery({
    name,
    ticker,
    type: MarketType.CASH,
  });

  const { data } = marketQuery;
  return (
    <Page>
      <h1>{data?.name}</h1>
      <em>
        Created
        {data?.createdAt.toLocaleDateString("en-us")}
      </em>
      <h2>Raw data:</h2>
      <Debug data={data} />
    </Page>
  );
};

MarketViewPage.auth = true;
export default MarketViewPage;
