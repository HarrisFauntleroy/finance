import { Prisma } from "database/generated/prisma-client"

// #?: Explain this
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

// #?: Explain this
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

/** Calculated values */
export interface AssetSummaryOutput extends AssetComplete {
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
	subAssets?: AssetComplete[]
	saleable: string
	value: string
	price: string
}

// #?: Explain this
export interface NestedAccountTotals {
	value: string
	subAssets: AssetSummaryOutput[]
	averageCost: string
	costBasis: string
	saleableValue: string
	unrealisedGain: string
	unrealisedGainPercentage: string
}

// #?: Explain this
export interface AssetSummaryInput {
	assets: AssetComplete[]
	exchangeRates: Record<string, string>
	userCurrency: string
}
