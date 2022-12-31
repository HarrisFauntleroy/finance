import { publicProcedure, router } from "../../trpc"
import { MarketSchema, MarketSelectSchema } from "./schema"
import { TRPCError } from "@trpc/server"
import { prisma } from "database"
import { MarketType } from "database/generated/prisma-client"
import { z } from "zod"

/**
 * Routers: Markets
 * @Queries
 * markets.byId ✅
 * markets.byUserId ✅
 * @Mutations
 * markets.create ✅
 * markets.update ✅
 * markets.delete ✅
 */

export const marketsRouter = router({
	create: publicProcedure.input(MarketSchema).mutation(async ({ input }) => {
		// TODO
		console.log("input", input)
	}),
	read: publicProcedure.input(MarketSchema).query(async ({ input }) => {
		// TODO
		console.log("input", input)
	}),
	update: publicProcedure
		.input(
			z.object({
				name: z.string(),
				ticker: z.string(),
				type: z.nativeEnum(MarketType),
				userId: z.string(),
				data: MarketSchema,
			})
		)
		.mutation(async ({ input }) => {
			const { ticker, type, data } = input
			return prisma.market.update({
				where: {
					ticker_type: {
						ticker,
						type,
					},
				},
				data,
				select: MarketSelectSchema,
			})
		}),
	// Soft delete, worker clears all things that are marked deleted after 7 days by the worker app
	delete: publicProcedure
		.input(
			z.object({
				name: z.string(),
				ticker: z.string(),
				type: z.nativeEnum(MarketType),
			})
		)
		.mutation(async ({ input }) => {
			return prisma.market.update({
				where: {
					ticker_type: {
						ticker: input.ticker,
						type: input.type,
					},
				},
				data: {
					deletedAt: new Date(),
					deleted: true,
				},
			})
		}),
	deleteQueue: publicProcedure.query(async () => {
		return prisma.market.findMany({
			where: {
				deleted: true,
			},
		})
	}),

	all: publicProcedure.input(MarketSchema).query(async () => {
		const market = await prisma.market.findMany()
		if (!market) {
			throw new TRPCError({
				code: "NOT_FOUND",
				message: "Cannot find list of cryptocurrencies from [all]",
			})
		}
		return market
	}),
	byName: publicProcedure
		.input(
			z.object({
				name: z.string(),
				ticker: z.string(),
				type: z.nativeEnum(MarketType),
			})
		)
		.query(async ({ input }) => {
			const { name, ticker, type } = input
			const market = await prisma.market.findUnique({
				where: {
					ticker_type: {
						ticker,
						type,
					},
				},
				select: MarketSelectSchema,
			})
			if (!market) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `No market with name '${name}'`,
				})
			}

			return market
		}),
	listMarkets: publicProcedure.input(MarketSchema).query(async () => {
		const market = await prisma.market.findMany({
			select: {
				name: true,
				ticker: true,
				image: true,
			},
		})
		if (!market) {
			throw new TRPCError({
				code: "NOT_FOUND",
				message: "Cannot find list of Markets",
			})
		}
		return market
	}),
	forex: publicProcedure.query(async () => {
		const market = await prisma.market.findMany({
			where: {
				type: MarketType.CASH,
			},
			select: {
				name: true,
				currency: true,
				ticker: true,
				image: true,
				price: true,
				priceChange24h: true,
				priceChange24hPercent: true,
				updatedAt: true,
			},
		})
		if (!market) {
			throw new TRPCError({
				code: "NOT_FOUND",
				message: "Cannot find list of Currencies",
			})
		}
		return market
	}),
	cryptocurrency: publicProcedure.query(async () => {
		const cryptocurrency = await prisma.market.findMany({
			where: {
				type: MarketType.CRYPTOCURRENCY,
			},
			select: {
				name: true,
				currency: true,
				ticker: true,
				image: true,
				price: true,
				priceChange24h: true,
				priceChange24hPercent: true,
				updatedAt: true,
			},
		})
		if (!cryptocurrency) {
			throw new TRPCError({
				code: "NOT_FOUND",
				message: "Cannot find list of Cryptocurrency",
			})
		}
		return cryptocurrency
	}),
})
