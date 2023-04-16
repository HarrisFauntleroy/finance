import { MarketType } from 'database/generated/prisma-client';
import { Debug, Page } from 'ui';

import { trpc } from '../../../utils/trpc';

import { useRouter } from 'next/router';

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
        {data?.createdAt.toLocaleDateString('en-us')}
      </em>
      <h2>Raw data:</h2>
      <Debug data={data} />
    </Page>
  );
};

MarketViewPage.auth = true;
export default MarketViewPage;
