import { sumArrayByKey } from "../../util";
import { AssetWithCalculatedValues } from "./types";

import currency from "currency.js";

export function calculateAssetValueOverview(data: AssetWithCalculatedValues[]) {
  const totalValue = sumArrayByKey(data, "value").toString();

  const totalCostBasis = sumArrayByKey(data, "costBasis").toString();

  const unrealisedGain = currency(totalValue)
    .subtract(totalCostBasis)
    .toString();

  const saleableValue = sumArrayByKey(data, "saleableValue").toString();

  const totalEstimatedYearlyReturn = sumArrayByKey(
    data,
    "estimatedYearlyReturn"
  ).toString();

  return {
    totalValue,
    saleableValue,
    totalCostBasis,
    unrealisedGain,
    totalEstimatedYearlyReturn,
  };
}
