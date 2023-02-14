/**
 *
 * Index page
 *
 */
import React from "react"

import {
	ArcElement,
	BarElement,
	CategoryScale,
	Chart,
	Filler,
	Legend,
	LineElement,
	LinearScale,
	PointElement,
	Title,
	Tooltip,
} from "chart.js"
import { Page } from "ui"
import type { NextPageWithLayout } from "~/pages/_app"
import type { Prisma } from "database/generated/prisma-client"
import { subtract, multiply, divide, lessThan } from "common"
import type { Decimal } from "database/generated/prisma-client/runtime"
import { trpc } from "~/utils/trpc"

Chart.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	ArcElement,
	Title,
	Tooltip,
	Legend,
	Filler
)

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

type AssetInput = Prisma.AssetGetPayload<{
	include: { market: true }
}>

class Asset {
	price: string

	balance: string

	value: string

	costBasis: string

	targetBalance: string

	incomeRate: string

	interestBearingBalance: string

	constructor(options: AssetInput) {
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

	toString(value?: string | Decimal | null) {
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

	get allGetters() {
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

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

const AssetCard = ({ asset }: { asset?: Asset | null }) => {
	return <div>{JSON.stringify(asset?.allGetters)}</div>
}

const Index: NextPageWithLayout = () => {
	const { data } = trpc.assets.byId.useQuery({
		id: "cldwad5ab00465avd6tpjbezj",
	})

	const asset = data && Asset.create(data)

	return (
		<Page title="Home" padding="8px" gap="8px">
			<AssetCard asset={asset} />
		</Page>
	)
}

Index.auth = false
export default Index
