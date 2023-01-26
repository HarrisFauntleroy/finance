import { sumArrayByKey } from "../../helpers"
import { divide, lessThan, multiply, subtract } from "../../math"
import { convertCurrency } from "../currency"
import { ExchangeRates } from "../forex"
import currency from "currency.js"
import { Asset, Market } from "database/generated/prisma-client"

export type AssetComplete = Asset & {
	user?: {
		settings: {
			userCurrency: string
		} | null
	}
	market?: Market | null
	subAssets: AssetCompleteChild[]
}

export type AssetCompleteChild = Asset & {
	user?: {
		settings: {
			userCurrency: string
		} | null
	}
	market?: Market | null
}

// Remove nested children
export type subAssetsOmitsubAssets = Omit<AssetComplete, "subAssets">

/** Extends asset type with all relations */
export interface AssetAndsubAssetsComplete
	extends Omit<AssetComplete, "subAssets"> {
	// Re add children without nesting
	subAssets?: subAssetsOmitsubAssets[]
}

/** =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
// TODO break all of these into their own files
/** =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

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

export function calculateAssetSummary(
	asset: subAssetsOmitsubAssets,
	exchangeRates: ExchangeRates,
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

	const balance = String(asset?.balance)
	const targetBalance = String(asset.targetBalance)
	const incomeRate = String(asset.incomeRate)
	const interestBearingBalance = String(asset.interestBearingBalance)

	const value = multiply(balance, price)
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

export interface CalculateOneAssetInput {
	asset: AssetComplete
	exchangeRates: ExchangeRates
	userCurrency: string
}

export function calculateOneAsset({
	asset,
	exchangeRates,
	userCurrency,
}: CalculateOneAssetInput): AssetSummaryOutput {
	/**
	 * Calculate the summary for the main asset account
	 */
	const finalData = calculateAssetSummary(asset, exchangeRates, userCurrency)

	/**
	 * Calculate the summary for any children asset accounts
	 * Mainly applicable to sub accounts like exchanges
	 */
	const subAssets = asset.subAssets?.map((child) =>
		calculateAssetSummary(child, exchangeRates, userCurrency)
	)

	/** Calculate totals for nested accounts */
	if (subAssets !== undefined && subAssets.length > 0) {
		return {
			...finalData,
			...calculateNestedAccountTotals(subAssets),
		}
	}

	return finalData
}

/** =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

export interface AssetSummaryInput {
	data: AssetComplete[]
	exchangeRates: ExchangeRates
	userCurrency: string
}

export function calculateManyAsset({
	data,
	userCurrency,
	exchangeRates,
}: AssetSummaryInput) {
	return data.map((asset) =>
		calculateOneAsset({ asset, userCurrency, exchangeRates })
	)
}

/** =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

export function calculateAssetOverview({
	data,
}: {
	data: AssetSummaryOutput[]
}) {
	/** Calculate Overview totals */

	const totalValue = sumArrayByKey(data, "value")

	const totalCostBasis = sumArrayByKey(data, "costBasis")

	const unrealisedGain = currency(totalValue).subtract(totalCostBasis)

	const saleableValue = sumArrayByKey(data, "saleableValue")

	const totalEstimatedYearlyReturn = sumArrayByKey(
		data,
		"estimatedYearlyReturn"
	)

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
