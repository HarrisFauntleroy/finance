import { publicProcedure, router } from "../../trpc"
import { TRPCError } from "@trpc/server"
import {
	calculateAssetOverview,
	calculateManyAsset,
	getExchangeRates,
} from "common"
import { prisma } from "database"
import type {
	Category,
	CustomAssetCategory,
} from "database/generated/prisma-client"
import { MarketType } from "database/generated/prisma-client"
import type { Decimal } from "database/generated/prisma-client/runtime"
import { z } from "zod"

export async function getPortfolioAllocation(userId: string): Promise<
	{
		balance: Decimal
		category: Category | null
		customCategory: CustomAssetCategory | null
		market: {
			price: Decimal | null
		} | null
	}[]
> {
	return await prisma.asset.findMany({
		where: { userId },
		select: {
			balance: true,
			category: true,
			customCategory: true,
			market: {
				select: {
					price: true,
				},
			},
		},
	})
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
			const { userCurrency } = await prisma.settings.findFirstOrThrow({
				where: {
					userId,
				},
			})

			const markets = await prisma.market.findMany({
				where: {
					type: MarketType.CASH,
				},
				select: {
					currency: true,
					price: true,
					name: true,
					ticker: true,
				},
			})

			/** Convert array to object */
			const exchangeRates = getExchangeRates(markets)

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
				calculateAssetOverview({ data: assets })

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
			return portfolioSnapshot
		}),
})
