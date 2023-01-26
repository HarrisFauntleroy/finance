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
	sub_assets: AssetCompleteChild[]
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
export type sub_assetsOmitsub_assets = Omit<AssetComplete, "sub_assets">

/** Extends asset type with all relations */
export interface AssetAndsub_assetsComplete
	extends Omit<AssetComplete, "sub_assets"> {
	// Re add children without nesting
	sub_assets?: sub_assetsOmitsub_assets[]
}

/** =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
// TODO break all of these into their own files
/** =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

export type AssetOmitCostBasisAndsub_assets = Omit<
	AssetComplete,
	"costBasis" | "sub_assets"
>

/** Calculated values */
export interface AssetSummaryOutput extends AssetOmitCostBasisAndsub_assets {
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
	sub_assets?: AssetOmitCostBasisAndsub_assets[]
	saleable: string
	value: string
	price: string
}

export function calculateAssetSummary(
	asset: sub_assetsOmitsub_assets,
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
	sub_assets: AssetSummaryOutput[]
	averageCost: string
	costBasis: string
	saleableValue: string
	unrealisedGain: string
	unrealisedGainPercentage: string
}

export function calculateNestedAccountTotals(
	sub_assets: AssetSummaryOutput[]
): NestedAccountTotals {
	const unrealisedGain = sumArrayByKey(sub_assets, "unrealisedGain")
	const unrealisedGainPercentage = sumArrayByKey(
		sub_assets,
		"unrealisedGainPercentage"
	)
	// Average cost doesn't need to be known on sub accounts?
	const averageCost = "0.00"
	const costBasis = sumArrayByKey(sub_assets, "costBasis")
	const value = sumArrayByKey(sub_assets, "value")
	const saleableValue = sumArrayByKey(sub_assets, "saleableValue")

	return {
		value,
		sub_assets,
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
	const sub_assets = asset.sub_assets?.map((child) =>
		calculateAssetSummary(child, exchangeRates, userCurrency)
	)

	/** Calculate totals for nested accounts */
	if (sub_assets !== undefined && sub_assets.length > 0) {
		return {
			...finalData,
			...calculateNestedAccountTotals(sub_assets),
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
