import { flattenArrToObj } from 'common';
import { prisma } from 'database';
import { MarketType } from 'database/generated/prisma-client';

export const getExchangeRates = async (): Promise<Record<string, string>> => {
  const markets = await prisma.market.findMany({
    where: {
      type: MarketType.CASH,
    },
    select: {
      currency: true,
      price: true,
      name: true,
      ticker: true,
    },
  });

  const market = markets?.map(({ price, ...rest }) => {
    return {
      ...rest,
      price: price?.toString(),
    };
  });
  return flattenArrToObj(market, 'ticker', 'price');
};
