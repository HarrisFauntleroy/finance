import { convertCurrency } from "../finance/currency"
import { divide, lessThan, multiply, subtract } from "../math"
import { sumArrayByKey } from "../sumArrayByKey"
import currency from "currency.js"
import { Category, Prisma } from "database/generated/prisma-client"

export type AssetComplete = Prisma.AssetGetPayload<{
	include: {
		market: true
		subAssets: {
			include: {
				market: true
				user: {
					select: {
						settings: { select: { userCurrency: true } }
					}
				}
			}
		}
		user: {
			select: {
				settings: { select: { userCurrency: true } }
			}
		}
	}
}>

// Because we only want subassets one level deep?
export type AssetCompleteChild = Prisma.AssetGetPayload<{
	include: {
		market: true
		user: {
			select: {
				settings: { select: { userCurrency: true } }
			}
		}
	}
}>

// export type subAssetsOmitsubAssets = Omit<AssetComplete, "subAssets">

// /** Extends asset type with all relations */
// export interface AssetAndsubAssetsComplete
// 	extends Omit<AssetComplete, "subAssets"> {
// 	// Re add children without nesting
// 	// why?
// 	subAssets?: subAssetsOmitsubAssets[]
// }

export type AssetOmitCostBasisAndsubAssets = Omit<
	AssetComplete,
	"costBasis" | "subAssets"
>

/** Calculated values */
export interface AssetSummaryOutput extends AssetOmitCostBasisAndsubAssets {
	unrealisedGainPercentage: string
	estimatedStakingYield: string
	estimatedYearlyReturn: string
	belowTargetBalance: boolean
	unrealisedGain: string
	saleableValue: string
	amountStaked: string
	averageCost: string
	costBasis: string
	shouldSell: boolean
	subAssets?: AssetOmitCostBasisAndsubAssets[]
	saleable: string
	value: string
	price: string
}

export function calculateAssetDetails(
	asset: AssetCompleteChild,
	exchangeRates: Record<string, string>,
	toCurrency = "usd"
): AssetSummaryOutput {
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

	return {
		...asset,
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

/** =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

export interface NestedAccountTotals {
	value: string
	subAssets: AssetSummaryOutput[]
	averageCost: string
	costBasis: string
	saleableValue: string
	unrealisedGain: string
	unrealisedGainPercentage: string
}

export function calculateNestedAccountTotals(
	subAssets: AssetSummaryOutput[]
): NestedAccountTotals {
	const unrealisedGain = sumArrayByKey(subAssets, "unrealisedGain")
	const unrealisedGainPercentage = sumArrayByKey(
		subAssets,
		"unrealisedGainPercentage"
	)
	// Average cost doesn't need to be known on sub accounts?
	const averageCost = "0.00"
	const costBasis = sumArrayByKey(subAssets, "costBasis")
	const value = sumArrayByKey(subAssets, "value")
	const saleableValue = sumArrayByKey(subAssets, "saleableValue")

	return {
		value,
		subAssets,
		averageCost,
		costBasis,
		saleableValue,
		unrealisedGain,
		unrealisedGainPercentage,
	}
}

/** =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

export interface AssetSummaryInput {
	data: AssetComplete[]
	exchangeRates: Record<string, string>
	userCurrency: string
}

export function calculateManyAssets({
	data,
	userCurrency,
	exchangeRates,
}: AssetSummaryInput) {
	return data.map((asset) => {
		const calculatedAsset = calculateAssetDetails(
			asset,
			exchangeRates,
			userCurrency
		)
		const calculatedSubAssets = asset.subAssets?.map((child) =>
			calculateAssetDetails(child, exchangeRates, userCurrency)
		)

		return calculatedSubAssets && calculatedSubAssets.length > 0
			? {
					...calculatedAsset,
					...calculateNestedAccountTotals(calculatedSubAssets),
			  }
			: calculatedAsset
	})
}

/** =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

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

/** =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

export function calculateAssetIncome() {
	return console.log("TODO: calculate income summary")
}
