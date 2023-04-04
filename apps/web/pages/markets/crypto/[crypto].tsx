import React from 'react';

import { MarketType } from 'database/generated/prisma-client';
import { Debug, Page } from 'ui';

import { trpc } from '~/utils/trpc';

import NextError from 'next/error';
import { useRouter } from 'next/router';

const MarketViewPage = () => {
  const { name, ticker } = useRouter().query as {
    name: string;
    ticker: string;
  };
  const marketQuery = trpc.markets.byName.useQuery({
    name,
    ticker,
    type: MarketType.CRYPTOCURRENCY,
  });

  if (marketQuery.error) {
    return (
      <NextError
        title={marketQuery.error.message}
        statusCode={marketQuery.error.data?.httpStatus ?? 500}
      />
    );
  }

  if (marketQuery.status !== 'success') {
    return <>Loading...</>;
  }

  const { data } = marketQuery;
  return (
    <Page>
      <h1>{data.name}</h1>
      <em>
        Created
        {data.createdAt.toLocaleDateString('en-us')}
      </em>
      <h2>Raw data:</h2>
      <Debug data={data} />
      cccccbctnduikktruvejdgijcuegnrvirghjrbtfuvjg
      cccccbctnduiincfhicnivcbcvdlfrhfefkujieigcfv
    </Page>
  );
};

MarketViewPage.auth = true;
export default MarketViewPage;
