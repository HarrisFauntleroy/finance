/* eslint-disable @typescript-eslint/no-explicit-any */
import { publicProcedure, router } from "../../trpc"
import { byUserId } from "../schema"
import { TRPCError } from "@trpc/server"
import {
	calculateAssetOverview,
	calculateManyAsset,
	convertCurrency,
	multiply,
} from "common"
import currencyjs from "currency.js"
import { prisma } from "database"
import { Category } from "database/generated/prisma-client"
import type { Decimal } from "database/generated/prisma-client/runtime"
import { getExchangeRates, getUserCurrency } from "~/server/api"

async function getAssetsWithMarket(userId: string) {
	return await prisma.asset.findMany({
		where: { userId, category: { not: null } },
		include: { market: true },
	})
}

const sumGroupByCategory = (arr: any[], category: string) =>
	arr.reduce(
		(
			grouped: { [x: string]: { add: (arg0: any) => any } },
			obj: { [x: string]: string | number; value: any }
		) => {
			if (!grouped[obj[category]]) grouped[obj[category]] = currencyjs(0)
			grouped[obj[category]] = grouped[obj[category]].add(obj.value)
			return grouped
		},
		{}
	)

type PortfolioAllocation = {
	name: string
	balance: Decimal
	currency: string
	category: Category | null
	market: {
		currency: string
		price: Decimal | null
	} | null
}

export async function getPortfolioAllocation(
	userId: string
): Promise<PortfolioAllocation[]> {
	const assets = await getAssetsWithMarket(userId)
	const userCurrency = await getUserCurrency(userId)
	const exchangeRates = await getExchangeRates()
	const mapped = assets.map(({ market, balance, category, currency }) => {
		const price = convertCurrency({
			exchangeRates,
			fromCurrency: market?.currency || currency,
			toCurrency: userCurrency,
			amount: market?.price?.toString() || 0,
		})
		let value
		if (price && category === Category.CRYPTOCURRENCY) {
			value = multiply(balance.toString(), price.toString())
		} else {
			value = balance
		}
		return { value: value.toString(), category }
	})

	return sumGroupByCategory(mapped, "category")
}

export const accountsRouter = router({
	byUserId: publicProcedure
		.input(byUserId)
		.query(async ({ input: { userId } }) => {
			const data = await prisma.user.findUnique({
				where: {
					id: userId,
				},
				select: {
					id: true,
					assets: {
						include: {
							market: true,
							subAssets: true,
						},
					},
					portfolioSnapshot: true,
				},
			})

			if (!data) {
				throw new TRPCError({
					code: "NOT_FOUND",
				})
			}

			const userCurrency = await getUserCurrency(userId)
			const exchangeRates = await getExchangeRates()

			const assets = calculateManyAsset({
				data: data?.assets,
				exchangeRates,
				userCurrency,
			})

			const { totalValue, totalCostBasis, unrealisedGain, saleableValue } =
				calculateAssetOverview(assets)

			return {
				totalValue,
				saleableValue,
				totalCostBasis,
				unrealisedGain,
				assets,
				portfolioSnapshot: data?.portfolioSnapshot,
			}
		}),

	allocation: publicProcedure
		.input(byUserId)
		.query(async ({ input: { userId } }) => {
			return getPortfolioAllocation(userId)
		}),

	historyByUserId: publicProcedure
		.input(byUserId)
		.query(async ({ input: { userId } }) => {
			// TODO would be nice if current total value and cost basis were in this as most recent data point
			const data = await prisma.user.findUnique({
				where: {
					id: userId,
				},
				select: {
					id: true,
					portfolioSnapshot: true,
				},
			})

			if (!data) {
				throw new TRPCError({
					code: "NOT_FOUND",
				})
			}

			return data
		}),
})
