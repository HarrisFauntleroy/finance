import { flattenArrToObj } from "@alchemical-finance/common";
import { prisma } from "@alchemical-finance/database";
import { MarketType } from "@alchemical-finance/database/generated/prisma-client";

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
  return flattenArrToObj(market, "ticker", "price");
};
