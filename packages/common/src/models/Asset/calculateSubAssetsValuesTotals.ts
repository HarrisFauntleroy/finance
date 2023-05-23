import { sumArrayByKey } from "../../util/sumArrayByKey";
import { AssetWithCalculatedValues, SubAssetValueTotals } from "./types";

// #?: Explain this
export function calculateSubAssetsValuesTotals(
  subAssets: AssetWithCalculatedValues[]
): SubAssetValueTotals {
  // Here we calculate on subAssets, this is interesting.
  const unrealisedGain = sumArrayByKey(subAssets, "unrealisedGain");
  const unrealisedGainPercentage = sumArrayByKey(
    subAssets,
    "unrealisedGainPercentage"
  );
  // Average cost doesn't need to be known on sub accounts?
  const averageCost = "0.00";
  const costBasis = sumArrayByKey(subAssets, "costBasis");
  const value = sumArrayByKey(subAssets, "value");
  const saleableValue = sumArrayByKey(subAssets, "saleableValue");

  return {
    value,
    subAssets,
    averageCost,
    costBasis,
    saleableValue,
    unrealisedGain,
    unrealisedGainPercentage,
  };
}
