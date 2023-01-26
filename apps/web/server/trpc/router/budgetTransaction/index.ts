import { publicProcedure, router } from "../../trpc"
import { TRPCError } from "@trpc/server"
import { prisma } from "database"
import { AccountConnection, Category } from "database/generated/prisma-client"
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

export enum ErrorCodes {
	NOT_FOUND = "NOT_FOUND",
}

export const ERROR_MESSAGES = {
	NOT_FOUND: (id: string) => `No asset with id '${id}'`,
}

const CurrencyType = z.string().regex(/^[A-Z]{3}$/)

export const budgetTransactionRouter = router({
	create: publicProcedure
		.input(
			z.object({
				userId: z.string(),
				name: z.string(),
				accountConnection: z.nativeEnum(AccountConnection).nullable(),
				currency: CurrencyType,
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
					code: ErrorCodes.NOT_FOUND,
					message: ERROR_MESSAGES.NOT_FOUND(id),
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
					code: ErrorCodes.NOT_FOUND,
					message: ERROR_MESSAGES.NOT_FOUND(id),
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

			return await prisma.budgetTransaction.findMany({
				where: {
					userId,
					// This keeps sub accounts nested
					budgetEnvelopeId: null,
				},
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
			await prisma.asset.delete({
				where: { id },
			})
			return {
				id,
			}
		}),
})
