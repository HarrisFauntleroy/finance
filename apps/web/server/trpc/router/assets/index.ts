import { publicProcedure, router } from "../../trpc"
import { CryptoSelectSchema } from "./schema"
import { TRPCError } from "@trpc/server"
import {
	calculateCryptoOverview,
	calculateManyCrypto,
	getExchangeRates,
} from "common"
import { prisma } from "database"
import {
	AccountConnection,
	Category,
	MarketType,
} from "database/generated/prisma-client"
import { z } from "zod"
import { decimal } from "~/utils/decimal"

/**
 * Routers: Asset
 * @Queries
 * asset.byId ✅
 * asset.byUserId ✅
 * @Mutations
 * asset.create ✅
 * asset.update ✅
 * asset.delete ✅
 */

export const assetRouter = router({
	create: publicProcedure
		.input(
			z.object({
				userId: z.string(),
				name: z.string(),
				accountConnection: z.nativeEnum(AccountConnection).nullable(),
				currency: z.string().max(3).min(3),
				value: decimal(),
				category: z.nativeEnum(Category),
				marketId: z.string().nullable(),
				balance: decimal().default(0),
				targetBalance: decimal().default(0),
				costBasis: decimal().default(0),
				interestBearingBalance: decimal().default(0),
				incomeRate: decimal().default(0),
				walletAddress: z.string().nullable(),
				apiKey: z.string().nullable(),
				apiSecret: z.string().nullable(),
			})
		)
		.mutation(async ({ input }) => {
			return prisma.asset.create({
				data: input,
				select: CryptoSelectSchema,
			})
		}),
	createChild: publicProcedure
		.input(
			z.object({
				id: z.string(),
				name: z.string(),
				currency: z.string(),
				apiKey: z.string().nullable(),
				apiSecret: z.string().nullable(),
				walletAddress: z.string().nullable(),
				value: decimal(),
				valueLastUpdated: z.date().nullable(),
				balance: decimal(),
				costBasis: decimal(),
				realisedGain: decimal(),
				targetBalance: decimal().nullable(),
				interestBearingBalance: decimal().nullable(),
				incomeRate: decimal().nullable(),
				connection: z.nativeEnum(AccountConnection).nullable(),
				category: z.nativeEnum(Category),
				// labels: z.array(z.instanceof(AssetLabel)),
				userId: z.string(),
				marketId: z.string().nullable(),
			})
		)
		.mutation(async ({ input }) => {
			return prisma.asset.create({
				data: input,
				include: {
					market: true,
					subAssets: {
						include: {
							market: true,
						},
					},
					transactions: true,
				},
			})
		}),
	update: publicProcedure
		.input(
			z.object({
				id: z.string(),
				userId: z.string(),
				name: z.string(),
				accountConnection: z.nativeEnum(AccountConnection).nullable(),
				currency: z.string().max(3).min(3),
				value: decimal(),
				valueLastUpdated: z.date(),
				category: z.nativeEnum(Category),
				marketId: z.string().nullable(),
				balance: decimal(),
				targetBalance: decimal(),
				costBasis: decimal(),
				realisedGain: decimal(),
				interestBearingBalance: decimal(),
				incomeRate: decimal(),
				walletAddress: z.string().nullable(),
				apiKey: z.string().nullable(),
				apiSecret: z.string().nullable(),
			})
		)
		.mutation(async ({ input }) => {
			const { id, ...data } = input
			return prisma.asset.update({
				where: { id },
				data,
				include: {
					user: true,
				},
			})
		}),
	all: publicProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.query(async ({ input }) => {
			const { id } = input
			const asset = await prisma.asset.findUnique({
				where: {
					id,
				},
				include: {
					market: true,
					subAssets: true,
					transactions: true,
					user: {
						select: {
							settings: {
								select: {
									userCurrency: true,
								},
							},
						},
					},
				},
			})
			if (!asset) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `No asset with id '${id}'`,
				})
			}

			return asset
		}),
	byId: publicProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.query(async ({ input }) => {
			const { id } = input
			const asset = await prisma.asset.findUnique({
				where: {
					id,
				},
				include: {
					market: true,
					subAssets: true,
					user: {
						select: {
							settings: {
								select: {
									userCurrency: true,
								},
							},
						},
					},
				},
			})
			if (!asset) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `No asset with id '${id}'`,
				})
			}

			return asset
		}),
	byUserId: publicProcedure
		.input(
			z.object({
				userId: z.string(),
			})
		)
		.query(async ({ input }) => {
			const { userId } = input

			const data = await prisma.asset.findMany({
				where: {
					userId,
					// This keeps sub accounts nested
					parentId: null,
				},
				include: {
					market: true,
					subAssets: {
						include: {
							market: true,
						},
					},
					user: {
						select: {
							settings: {
								select: {
									userCurrency: true,
								},
							},
						},
					},
				},
			})
			const { userCurrency } = await prisma.settings.findFirstOrThrow({
				where: {
					userId,
				},
			})

			// Fetch the market rates
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

			// If no asset was found for the user, throw an error
			if (!data) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `No asset with userId '${userId}'`,
				})
			}
			// Calculate the asset values using the provided data, exchange rates, and user currency
			return calculateManyCrypto({
				data: data,
				exchangeRates,
				userCurrency,
			})
		}),
	overviewByUserId: publicProcedure
		.input(
			z.object({
				userId: z.string(),
			})
		)
		.query(async ({ input }) => {
			// Destructure the userId from the input object
			const { userId } = input
			// Fetch the asset data for the user with the specified userId
			// Include the market data, children of the asset, and the user's settings
			const data = await prisma.asset.findMany({
				where: {
					userId,
					parentId: null,
				},
				include: {
					market: true,
					subAssets: true,
				},
			})
			// Fetch the user's settings
			const settings = await prisma.settings.findFirstOrThrow({
				where: {
					userId,
				},
			})
			// Get the user's preferred currency
			const userCurrency = settings.userCurrency
			// Fetch the market rates
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
					message: `No asset with userId '${userId}'`,
				})
			}

			/** Calculate asset for overview */
			const asset = calculateManyCrypto({
				data,
				exchangeRates,
				userCurrency,
			})

			/** Overview should be its own router */
			const {
				totalValue,
				totalCostBasis,
				unrealisedGain,
				saleableValue,
				totalEstimatedYearlyReturn,
			} = calculateCryptoOverview({ data: asset })

			return {
				totalValue: totalValue,
				saleableValue: saleableValue,
				totalCostBasis: totalCostBasis,
				unrealisedGain: unrealisedGain,
				totalEstimatedYearlyReturn: totalEstimatedYearlyReturn,
			}
		}),
	targets: publicProcedure
		.input(
			z.object({
				userId: z.string(),
			})
		)
		.query(async ({ input }) => {
			const { userId } = input
			const data = await prisma.asset.findMany({
				where: {
					userId,
				},
				select: {
					balance: true,
					targetBalance: true,
					marketId: true,
					name: true,
				},
			})

			if (!data) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `No asset with userId '${userId}'`,
				})
			}
			return data
		}),
	delete: publicProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			const { id } = input
			await prisma.asset.delete({
				where: { id },
			})
			return {
				id,
			}
		}),
})
