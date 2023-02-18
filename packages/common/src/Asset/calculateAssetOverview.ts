// #?: Explain this
import { sumArrayByKey } from "../sumArrayByKey"
import { AssetSummaryOutput } from "./types"
import currency from "currency.js"

// Takes in the output of calculateManyAssets
export function calculateAssetOverview(data: AssetSummaryOutput[]) {
	const totalValue = sumArrayByKey(data, "value").toString()

	const totalCostBasis = sumArrayByKey(data, "costBasis").toString()

	const unrealisedGain = currency(totalValue)
		.subtract(totalCostBasis)
		.toString()

	const saleableValue = sumArrayByKey(data, "saleableValue").toString()

	const totalEstimatedYearlyReturn = sumArrayByKey(
		data,
		"estimatedYearlyReturn"
	).toString()

	return {
		totalValue,
		saleableValue,
		totalCostBasis,
		unrealisedGain,
		totalEstimatedYearlyReturn,
	}
}
