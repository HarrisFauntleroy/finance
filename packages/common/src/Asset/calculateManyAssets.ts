import { calculateAsset } from "./calculateAsset"
import { calculateNestedAccountTotals } from "./calculateNestedAccountTotals"
import { calculateSubAssets } from "./calculateSubAssets"
import { AssetSummaryInput } from "./types"

// #?: Explain this
export function calculateManyAssets({
	assets,
	userCurrency,
	exchangeRates,
}: AssetSummaryInput) {
	return assets.map((asset) => {
		const calculatedAsset = calculateAsset(asset, exchangeRates, userCurrency)
		const calculatedSubAssets = calculateSubAssets(
			asset,
			exchangeRates,
			userCurrency
		)

		return calculatedSubAssets && calculatedSubAssets.length > 0
			? {
					...calculatedAsset,
					...calculateNestedAccountTotals(calculatedSubAssets),
			  }
			: calculatedAsset
	})
}
