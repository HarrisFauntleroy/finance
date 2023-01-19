import { ExchangeRates } from "../../finance/forex"
import { sumArrayByKey } from "../../helpers"
import { divide, lessThan, multiply, subtract } from "../../math"
import { convertCurrency } from "../currency"
import currency from "currency.js"
import { Cryptocurrency, Market } from "database/generated/prisma-client"

export type CryptoComplete = Cryptocurrency & {
	user?: {
		settings: {
			userCurrency: string
		} | null
	}
	market?: Market | null
	Children: CryptoCompleteChild[]
}

export type CryptoCompleteChild = Cryptocurrency & {
	user?: {
		settings: {
			userCurrency: string
		} | null
	}
	market?: Market | null
}

// Remove nested children
export type ChildrenOmitChildren = Omit<CryptoComplete, "Children">

/** Extends cryptocurrency type with all relations */
export interface CryptoAndChildrenComplete
	extends Omit<CryptoComplete, "Children"> {
	// Re add children without nesting
	Children?: ChildrenOmitChildren[]
}

/** =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
// TODO break all of these into their own files
/** =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

export type CryptoOmitCostBasisAndChildren = Omit<
	CryptoComplete,
	"costBasis" | "Children"
>

/** Calculated values */
export interface CryptoSummaryOutput extends CryptoOmitCostBasisAndChildren {
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
	Children?: CryptoOmitCostBasisAndChildren[]
	saleable: string
	value: string
	price: string
}

export function calculateCryptoSummary(
	crypto: ChildrenOmitChildren,
	exchangeRates: ExchangeRates,
	toCurrency = "usd"
): CryptoSummaryOutput {
	const price = convertCurrency({
		exchangeRates,
		fromCurrency: crypto?.market?.currency || crypto.currency,
		toCurrency: toCurrency,
		amount: crypto?.market?.price.toString() || 0,
	})

	const costBasis = convertCurrency({
		exchangeRates,
		fromCurrency: crypto.currency,
		toCurrency: toCurrency,
		amount: crypto.costBasis.toString(),
	})

	const balance = String(crypto?.balance)
	const targetBalance = String(crypto.targetBalance)
	const incomeRate = String(crypto.incomeRate)
	const interestBearingBalance = String(crypto.interestBearingBalance)

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
		...crypto,
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
	Children: CryptoSummaryOutput[]
	averageCost: string
	costBasis: string
	saleableValue: string
	unrealisedGain: string
	unrealisedGainPercentage: string
}

export function calculateNestedAccountTotals(
	Children: CryptoSummaryOutput[]
): NestedAccountTotals {
	const unrealisedGain = sumArrayByKey(Children, "unrealisedGain")
	const unrealisedGainPercentage = sumArrayByKey(
		Children,
		"unrealisedGainPercentage"
	)
	// Average cost doesn't need to be known on sub accounts?
	const averageCost = "0.00"
	const costBasis = sumArrayByKey(Children, "costBasis")
	const value = sumArrayByKey(Children, "value")
	const saleableValue = sumArrayByKey(Children, "saleableValue")

	return {
		value,
		Children,
		averageCost,
		costBasis,
		saleableValue,
		unrealisedGain,
		unrealisedGainPercentage,
	}
}

/** =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

export interface CalculateOneCryptoInput {
	crypto: CryptoComplete
	exchangeRates: ExchangeRates
	userCurrency: string
}

export function calculateOneCrypto({
	crypto,
	exchangeRates,
	userCurrency,
}: CalculateOneCryptoInput): CryptoSummaryOutput {
	/**
	 * Calculate the summary for the main crypto account
	 */
	const finalData = calculateCryptoSummary(crypto, exchangeRates, userCurrency)

	/**
	 * Calculate the summary for any children crypto accounts
	 * Mainly applicable to sub accounts like exchanges
	 */
	const Children = crypto.Children?.map((child) =>
		calculateCryptoSummary(child, exchangeRates, userCurrency)
	)

	/** Calculate totals for nested accounts */
	if (Children !== undefined && Children.length > 0) {
		return {
			...finalData,
			...calculateNestedAccountTotals(Children),
		}
	}

	return finalData
}

/** =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

export interface CryptoSummaryInput {
	data: CryptoComplete[]
	exchangeRates: ExchangeRates
	userCurrency: string
}

export function calculateManyCrypto({
	data,
	userCurrency,
	exchangeRates,
}: CryptoSummaryInput) {
	return data.map((crypto) =>
		calculateOneCrypto({ crypto, userCurrency, exchangeRates })
	)
}

/** =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

export function calculateCryptoOverview({
	data,
}: {
	data: CryptoSummaryOutput[]
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

export function calculateCryptoIncome() {
	return console.log("TODO: calculate income summary")
}
