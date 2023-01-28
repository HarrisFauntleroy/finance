/* eslint-disable @typescript-eslint/no-explicit-any */
import { publicProcedure, router } from "../../trpc"
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
import { z } from "zod"
import { getExchangeRates, getUserCurrency } from "~/server/api"

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

export async function getPortfolioAllocation(userId: string): Promise<
	{
		name: string
		balance: Decimal
		currency: string
		category: Category | null
		market: {
			currency: string
			price: Decimal | null
		} | null
	}[]
> {
	const results = await prisma.asset.findMany({
		where: { userId },
		select: {
			name: true,
			balance: true,
			currency: true,
			category: true,
			market: {
				select: {
					price: true,
					currency: true,
				},
			},
		},
	})

	const userCurrency = await getUserCurrency(userId)

	const exchangeRates = await getExchangeRates()

	// This piece of magic returns an object with a key for each category for a pie chart with a value
	const mapped = results.map(({ market, balance, category, currency }) => {
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

/**
 * Routers: Accounts
 * @Queries
 * accounts.byUserId ✅
 * accounts.historyByUserId ✅
 */

export const accountsRouter = router({
	byUserId: publicProcedure
		.input(
			z.object({
				userId: z.string(),
			})
		)
		.query(async ({ input }) => {
			const { userId } = input

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

			const userCurrency = await getUserCurrency(userId)

			const exchangeRates = await getExchangeRates()

			if (!data) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `No user with userId '${userId}'`,
				})
			}

			/** Calculate assets for overview */
			const assets = calculateManyAsset({
				data: data.assets,
				exchangeRates,
				userCurrency,
			})

			// Calculate the total value, saleable value, total cost basis, and unrealised gain for the assets
			const { totalValue, totalCostBasis, unrealisedGain, saleableValue } =
				calculateAssetOverview(assets)

			// Return the calculated values and the user's assets and accounts history
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
		.input(
			z.object({
				userId: z.string(),
			})
		)
		.query(async ({ input }) => {
			// Destructure the userId from the input object
			const { userId } = input
			return getPortfolioAllocation(userId)
		}),
	historyByUserId: publicProcedure
		.input(
			z.object({
				userId: z.string(),
			})
		)
		.query(async ({ input }) => {
			const { userId } = input
			const portfolioSnapshot = await prisma.user.findUnique({
				where: {
					id: userId,
				},
				select: {
					id: true,
					portfolioSnapshot: true,
				},
			})
			if (!portfolioSnapshot) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `No portfolioSnapshot with userId '${userId}'`,
				})
			}
			// TODO would be nice if current total value and cost basis were in this as most recent data point
			return portfolioSnapshot
		}),
})
