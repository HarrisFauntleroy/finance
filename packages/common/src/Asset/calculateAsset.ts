// #?: Explain this
// Takes assets including their transactions and subassets
import { convertCurrency } from "../finance"
import { divide, lessThan, multiply, subtract } from "../math"
import { AssetCompleteChild, AssetSummaryOutput } from "./types"
import { Category } from "database/generated/prisma-client"

// Returning an array of assets with calculated values
export function calculateAsset(
	asset: AssetCompleteChild,
	exchangeRates: Record<string, string>,
	toCurrency = "usd"
): AssetSummaryOutput {
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
