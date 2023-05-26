import { flattenArrToObj, logger } from "@alchemical-finance/common";
import { prisma } from "@alchemical-finance/database";
import { MarketType } from "@alchemical-finance/database/generated/prisma-client";

export function runOnServer(fn: () => void) {
  if (typeof window === "undefined" || !process.browser) {
    fn();
  } else {
    logger.error("This function can only be run on the server");
  }
}

export const getExchangeRates = async (): Promise<Record<string, string>> => {
  // Fetch the market rates
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

export const getUserCurrency = async (userId: string): Promise<string> => {
  const { userCurrency } = await prisma.settings.findFirstOrThrow({
    where: {
      userId,
    },
    select: {
      userCurrency: true,
    },
  });
  return userCurrency;
};
