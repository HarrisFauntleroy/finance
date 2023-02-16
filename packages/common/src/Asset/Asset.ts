import { divide, lessThan, multiply, subtract } from "../math"
import { Prisma } from "database/generated/prisma-client"

type AssetInput = Prisma.AssetGetPayload<{
	include: { market: true }
}>

export class Asset {
	price: string

	balance: string

	value: string

	costBasis: string

	targetBalance: string

	incomeRate: string

	interestBearingBalance: string

	constructor(options?: AssetInput) {
		this.price = options?.market?.price || "0"
		this.balance = options?.balance || "0"
		this.value = multiply(this.price, this.balance)
		this.costBasis = options?.costBasis || "0"
		this.targetBalance = options?.targetBalance || "0"
		this.incomeRate = options?.incomeRate || "0"
		this.interestBearingBalance = options?.interestBearingBalance || "0"
	}

	static create(options: AssetInput): Asset {
		return new Asset(options)
	}

	toString(value?: string | null) {
		return String(value)
	}

	get unrealizedGain(): string {
		return subtract(this.value, this.costBasis)
	}

	get averageCost() {
		return multiply(this.costBasis, this.balance)
	}

	get saleable() {
		return subtract(this.balance, this.targetBalance)
	}

	get saleableValue() {
		return multiply(this.saleable, this.price)
	}

	get estimatedStakingYield() {
		return divide(multiply(this.incomeRate, this.interestBearingBalance), 100)
	}

	get estimatedYearlyReturn() {
		return multiply(this.estimatedStakingYield, this.price)
	}

	get belowTargetBalance() {
		return lessThan(this.saleable, this.targetBalance)
	}

	get shouldSell() {
		return this.averageCost < this.price
	}

	get computedProperties() {
		return {
			...this,
			unrealizedGain: this.unrealizedGain,
			averageCost: this.averageCost,
			saleable: this.saleable,
			saleableValue: this.saleableValue,
			estimatedStakingYield: this.estimatedStakingYield,
			estimatedYearlyReturn: this.estimatedYearlyReturn,
			belowTargetBalance: this.belowTargetBalance,
			shouldSell: this.shouldSell,
		}
	}
}

// unrealisedGainPercentage: string
// estimatedStakingYield: string
// estimatedYearlyReturn: string
// belowTargetBalance: boolean
// unrealisedGain: string
// saleableValue: string
// amountStaked: string
// averageCost: string
// costBasis: string
// shouldSell: boolean
// subAssets?: AssetOmitCostBasisAndsubAssets[]

// Delete ASAP just old reference
/** The calculated output with additional values */
// export interface CalculatedAsset extends Omit<PrismaAsset, "costBasis"> {
// 	market: Market | null
// 	/** subAssets are only calculated one level deep */
// 	subAssets?: Omit<CalculatedAsset, "subAssets">[]
// 	value: string
// 	price: string
// 	costBasis: string
// 	saleable: string
// 	saleableValue: string
// 	unrealisedGain: string
// 	averageCost: string
// 	unrealisedGainPercentage: string
// 	amountStaked: string
// 	estimatedStakingYield: string
// 	estimatedYearlyReturn: string
// 	/** Is targetBalance higher or lower than saleable amount */
// 	belowTargetBalance: boolean
// 	/** Is average price lower than current price */
// 	shouldSell: boolean
// }