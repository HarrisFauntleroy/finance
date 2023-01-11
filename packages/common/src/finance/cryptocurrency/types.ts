import {
	Market,
	Cryptocurrency as PrismaCryptocurrency,
} from "database/generated/prisma-client"

/** Extends cryptocurrency type with all relations */
export interface Cryptocurrency extends PrismaCryptocurrency {
	market: Market | null
	Children?: Cryptocurrency[]
}

/** The calculated output with additional values */
export interface CalculatedCryptocurrency
	extends Omit<PrismaCryptocurrency, "costBasis"> {
	market: Market | null
	/** Children are only calculated one level deep */
	Children?: Omit<CalculatedCryptocurrency, "Children">[]
	value: string
	price: string
	costBasis: string
	saleable: string
	saleableValue: string
	unrealisedGain: string
	averageCost: string
	unrealisedGainPercentage: string
	amountStaked: string
	estimatedStakingYield: string
	estimatedYearlyReturn: string
	/** Is targetBalance higher or lower than saleable amount */
	belowTargetBalance: boolean
	/** Is average price lower than current price */
	shouldSell: boolean
}
