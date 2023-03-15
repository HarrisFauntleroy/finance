// #?: Explain this
// Takes assets including their transactions and subassets
import { convertCurrency } from "../../util/finance"
import { divide, lessThan, multiply, subtract } from "../../util/math"
import { calculateAssetValueOverview } from "./calculateAssetValueOverview"
import { AssetWithCalculatedValues, AssetWithRelatedDataChild } from "./types"
import { Category } from "database/generated/prisma-client"

// Returning an array of assets with calculated values
export function calculateAssetValue(
	asset: AssetWithRelatedDataChild,
	exchangeRates: Record<string, string>,
	toCurrency = "usd"
): AssetWithCalculatedValues {
	// const itts = Asset.create(asset)
	// logger.info(itts)

	// return itts.computedProperties

	const price = convertCurrency({
		exchangeRates,
		fromCurrency: asset?.market?.currency || asset.currency,
		toCurrency: toCurrency,
		amount: asset?.market?.price?.toString() || 0,
	})

	const costBasis = convertCurrency({
		exchangeRates,
		fromCurrency: asset.currency,
		toCurrency: toCurrency,
		amount: asset.costBasis.toString(),
	})

	const balance = asset?.balance?.toString() || "0"

	const value =
		asset.category === Category.CRYPTOCURRENCY
			? multiply(balance, price)
			: balance

	const targetBalance = asset.targetBalance?.toString() || "0"
	const incomeRate = asset.incomeRate?.toString() || "0"
	const interestBearingBalance = asset.interestBearingBalance?.toString() || "0"

	const unrealisedGain = subtract(value, costBasis)
	const unrealisedGainPercentage = divide(unrealisedGain, costBasis)
	const averageCost = divide(costBasis, balance)
	const saleable = subtract(balance, targetBalance)
	const saleableValue = multiply(saleable, price)
	const estimatedStakingYield = divide(
		multiply(incomeRate, interestBearingBalance),
		100
	)
	const estimatedYearlyReturn = multiply(estimatedStakingYield, price)
	const belowTargetBalance = lessThan(saleable, targetBalance)
	const shouldSell = lessThan(averageCost, price)

	// So the logic here is that, if there is a subAsset, then we calculate the subAsset, and then we calculate the totals of the subAssets.
	const calculatedSubAssets = asset.subAssets?.map((child) =>
		calculateAssetValue({ ...child, subAssets: [] }, exchangeRates, toCurrency)
	)

	const subAssetTotals = calculateAssetValueOverview(calculatedSubAssets)

	if (subAssetTotals) {
		return {
			...asset,
			...subAssetTotals,
			shouldSell,
			belowTargetBalance,
			price: price,
			currency: toCurrency,
			saleable: saleable,
			amountStaked: interestBearingBalance,
			estimatedYearlyReturn: estimatedYearlyReturn,
			estimatedStakingYield: estimatedStakingYield,
			subAssets: calculatedSubAssets,
			value: value,
			costBasis: costBasis,
			averageCost: averageCost,
			saleableValue: saleableValue,
			unrealisedGain: unrealisedGain,
			unrealisedGainPercentage: unrealisedGainPercentage,
		}
	}

	return {
		...asset,
		subAssets: calculatedSubAssets,
		shouldSell,
		belowTargetBalance,
		value: value,
		price: price,
		currency: toCurrency,
		saleable: saleable,
		costBasis: costBasis,
		averageCost: averageCost,
		amountStaked: interestBearingBalance,
		saleableValue: saleableValue,
		unrealisedGain: unrealisedGain,
		estimatedYearlyReturn: estimatedYearlyReturn,
		estimatedStakingYield: estimatedStakingYield,
		unrealisedGainPercentage: unrealisedGainPercentage,
	}
}
