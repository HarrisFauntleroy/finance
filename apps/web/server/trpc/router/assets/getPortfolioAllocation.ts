import {
  convertCurrency,
  multiply,
  sumGroupByCategory,
} from "@alchemical-finance/common";
import { Category } from "@alchemical-finance/database/generated/prisma-client";

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
    let value;
    if (price && category === Category.CRYPTOCURRENCY) {
      value = multiply(balance.toString(), price.toString());
    } else {
      value = balance;
    }
    return { value: value.toString(), category };
  });
  return sumGroupByCategory(mapped, "category");
}
