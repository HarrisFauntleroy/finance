import { calculateAsset } from "./calculateAsset"
import { AssetComplete } from "./types"

// #?: Explain this
export const calculateSubAssets = (
	asset: AssetComplete,
	exchangeRates: Record<string, string>,
	userCurrency: string
) =>
	asset.subAssets?.map((child) =>
		calculateAsset(child, exchangeRates, userCurrency)
	)
