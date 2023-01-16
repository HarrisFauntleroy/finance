import { publicProcedure, router } from "../../trpc"
import {
	CryptoSelectSchema,
	CryptocurrencySchema,
	CryptocurrencySchemaWithId,
} from "./schema"
import { TRPCError } from "@trpc/server"
import {
	calculateCryptoOverview,
	calculateManyCrypto,
	getExchangeRates,
} from "common"
import { prisma } from "database"
import { MarketType } from "database/generated/prisma-client"
import { z } from "zod"

/**
 * Routers: Cryptocurrency
 * @Queries
 * cryptocurrency.byId ✅
 * cryptocurrency.byUserId ✅
 * @Mutations
 * cryptocurrency.create ✅
 * cryptocurrency.update ✅
 * cryptocurrency.delete ✅
 */

export const cryptocurrencyRouter = router({
	create: publicProcedure
		.input(CryptocurrencySchema)
		.mutation(async ({ input }) => {
			return prisma.cryptocurrency.create({
				data: input,
				select: CryptoSelectSchema,
			})
		}),
	createChild: publicProcedure
		.input(CryptocurrencySchema)
		.mutation(async ({ input }) => {
			return prisma.cryptocurrency.create({
				data: input,
				// select: CryptoSelectSchema,
				include: {
					Children: {
						include: {
							Children: true,
							market: true,
						},
					},
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
			const cryptocurrency = await prisma.cryptocurrency.findUnique({
				where: {
					id,
				},
				include: {
					market: true,
					Children: true,
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
			if (!cryptocurrency) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `No cryptocurrency with id '${id}'`,
				})
			}

			return cryptocurrency
		}),
	byId: publicProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.query(async ({ input }) => {
			const { id } = input
			const cryptocurrency = await prisma.cryptocurrency.findUnique({
				where: {
					id,
				},
				include: {
					market: true,
					Children: true,
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
			if (!cryptocurrency) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `No cryptocurrency with id '${id}'`,
				})
			}

			return cryptocurrency
		}),
	byUserId: publicProcedure
		.input(
			z.object({
				userId: z.string(),
			})
		)
		.query(async ({ input }) => {
			const { userId } = input

			const data = await prisma.cryptocurrency.findMany({
				where: {
					userId,
					// This keeps sub accounts nested
					parentId: null,
				},
				include: {
					market: true,
					Children: {
						include: {
							// Needed for price data
							// Could lean this out
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

			// If no cryptocurrency was found for the user, throw an error
			if (!data) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `No cryptocurrency with userId '${userId}'`,
				})
			}
			// Calculate the cryptocurrency values using the provided data, exchange rates, and user currency
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
			// Fetch the cryptocurrency data for the user with the specified userId
			// Include the market data, children of the cryptocurrency, and the user's settings
			const data = await prisma.cryptocurrency.findMany({
				where: {
					userId,
					parentId: null,
				},
				include: {
					market: true,
					Children: true,
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
					message: `No cryptocurrency with userId '${userId}'`,
				})
			}

			/** Calculate cryptocurrency for overview */
			const cryptocurrency = calculateManyCrypto({
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
			} = calculateCryptoOverview({ data: cryptocurrency })

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
			const data = await prisma.cryptocurrency.findMany({
				where: {
					userId,
				},
				select: {
					balance: true,
					targetBalance: true,
					marketId: true,
					displayName: true,
				},
			})

			if (!data) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `No cryptocurrency with userId '${userId}'`,
				})
			}
			return data
		}),
	update: publicProcedure
		.input(
			z.object({
				id: z.string(),
				userId: z.string(),
				data: CryptocurrencySchemaWithId,
			})
		)
		.mutation(async ({ input }) => {
			const { id, data } = input
			return prisma.cryptocurrency.update({
				where: { id },
				data,
				select: CryptoSelectSchema,
			})
		}),
	delete: publicProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			const { id } = input
			await prisma.cryptocurrency.delete({
				where: { id },
			})
			return {
				id,
			}
		}),
})