import { convertCurrency, multiply, sumGroupByCategory } from "common";
import { Category } from "database/generated/prisma-client";

import { getExchangeRates, getUserCurrency } from "../../../api";
import { getAssetsWithMarket } from "./getAssetsWithMarket";

export type PortfolioAllocation = {
  name: string;
  balance: string;
  currency: string;
  category: Category | null;
  market: {
    currency: string;
    price: string | null;
  } | null;
};

export async function getPortfolioAllocation(
  userId: string
): Promise<PortfolioAllocation[]> {
  const assets = await getAssetsWithMarket(userId);
  const userCurrency = await getUserCurrency(userId);
  const exchangeRates = await getExchangeRates();
  const mapped = assets.map(({ market, balance, category, currency }) => {
    const price = convertCurrency({
      exchangeRates,
      fromCurrency: market?.currency || currency,
      toCurrency: userCurrency,
      amount: market?.price?.toString() || 0,
    });
    const value =
      price && category === Category.CRYPTOCURRENCY
        ? multiply(balance.toString(), price.toString())
        : balance;
    return { value: value.toString(), category };
  });
  return sumGroupByCategory(mapped, "category");
}
