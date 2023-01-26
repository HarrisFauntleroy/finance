import { Market, Asset as PrismaAsset } from "database/generated/prisma-client"

/** Extends cryptocurrency type with all relations */
export interface Asset extends PrismaAsset {
	market: Market | null
	subAssets?: Asset[]
}

/** The calculated output with additional values */
export interface CalculatedAsset extends Omit<PrismaAsset, "costBasis"> {
	market: Market | null
	/** subAssets are only calculated one level deep */
	subAssets?: Omit<CalculatedAsset, "subAssets">[]
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
