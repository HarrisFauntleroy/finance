import { ExchangeRates } from "../../../finance/forex"
import { convertCurrency, money } from "../../../finance/helpers"
import { sumArrayByKey } from "../../../helpers"
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
type ChildrenOmitChildren = Omit<CryptoComplete, "Children">

/** Extends cryptocurrency type with all relations */
export interface CryptoAndChildrenComplete
	extends Omit<CryptoComplete, "Children"> {
	// Re add children without nesting
	Children?: ChildrenOmitChildren[]
}

/** =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
// TODO break all of these into their own files
/** =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

type CryptoOmitCostBasisAndChildren = Omit<
	CryptoComplete,
	"costBasis" | "Children"
>

/** Calculated values */
interface CryptoSummaryOutput extends CryptoOmitCostBasisAndChildren {
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
		amount: crypto?.market?.price.toString(),
	})

	const costBasis = convertCurrency({
		exchangeRates,
		fromCurrency: crypto.currency,
		toCurrency: toCurrency,
		amount: crypto.costBasis.toString(),
	})

	/** Basic stats */
	const balance = money(crypto?.balance)
	const targetBalance = money(crypto.targetBalance)

	const value = balance.multiply(price)
	const unrealisedGain = value.subtract(costBasis)
	const unrealisedGainPercentage = Number.isNaN(
		unrealisedGain.divide(costBasis).value
	)
		? "0"
		: unrealisedGain.divide(costBasis)
	const averageCost = costBasis.divide(balance)
	/** Liquid assets */
	const saleable = balance.subtract(targetBalance)
	const saleableValue = saleable.multiply(price)
	/** Income */
	const estimatedStakingYield = money(crypto.rateOfIncome)
		.multiply(money(crypto.interestBearingBalance))
		.divide(100)
	const estimatedYearlyReturn = estimatedStakingYield.multiply(price)
	const amountStaked = money(crypto.interestBearingBalance)
	/** Suggestions */
	const belowTargetBalance = saleable.intValue < targetBalance.intValue
	const shouldSell = averageCost < price

	return {
		...crypto,
		shouldSell,
		belowTargetBalance,
		value: value.toString(),
		price: price.toString(),
		currency: toCurrency,
		saleable: saleable.toString(),
		costBasis: costBasis.toString(),
		averageCost: averageCost.toString(),
		amountStaked: amountStaked.toString(),
		saleableValue: saleableValue.toString(),
		unrealisedGain: unrealisedGain.toString(),
		estimatedYearlyReturn: estimatedYearlyReturn.toString(),
		estimatedStakingYield: estimatedStakingYield.toString(),
		unrealisedGainPercentage: unrealisedGainPercentage.toString(),
	}
}

/** =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

interface NestedAccountTotals {
	value: string
	Children: CryptoSummaryOutput[]
	averageCost: string
	costBasis: string
	saleableValue: string
	unrealisedGain: string
	unrealisedGainPercentage: string
}

function calculateNestedAccountTotals(
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

interface CalculateOneCryptoInput {
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

interface CryptoSummaryInput {
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

	const unrealisedGain = money(totalValue).subtract(totalCostBasis)

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
