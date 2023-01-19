import { publicProcedure, router } from "../../trpc"
import { BudgetSchema } from "./schema"
import { TRPCError } from "@trpc/server"
import { prisma } from "database"
import { z } from "zod"
import { decimal } from "~/utils/decimal"

/**
 * Routers: Budget
 * @Queries
 * budget.byId ✅
 * budget.byUserId ✅
 * @Mutations
 * budget.create ✅
 * budget.update ✅
 * budget.delete ✅
 */

export const budgetRouter = router({
	// Firstly, create a budget.
	create: publicProcedure
		.input(
			z.object({
				name: z.string(),
				userId: z.string(),
				totalBalance: decimal(),
			})
		)
		.mutation(async ({ input }) => {
			return prisma.budget.create({
				data: input,
				select: BudgetSchema,
			})
		}),
	update: publicProcedure
		.input(
			z.object({
				id: z.string(),
				name: z.string(),
				userId: z.string(),
				totalBalance: decimal(),
			})
		)
		.mutation(async ({ input }) => {
			const { id, ...data } = input
			const budgetResponse = await prisma.budget.update({
				where: { id },
				data,
				select: BudgetSchema,
			})
			if (!budgetResponse) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `No budget with id '${id}'`,
				})
			}
			return budgetResponse
		}),
	byId: publicProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.query(async ({ input }) => {
			const { id } = input
			const budgetResponse = await prisma.budget.findUnique({
				where: {
					id,
				},
				select: BudgetSchema,
			})
			if (!budgetResponse) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `No budget with id '${id}'`,
				})
			}
			return budgetResponse
		}),
	byUserId: publicProcedure
		.input(
			z.object({
				userId: z.string(),
			})
		)
		.query(async ({ input }) => {
			const { userId } = input
			const budgetResponse = await prisma.budget.findMany({
				where: {
					userId,
				},
				select: BudgetSchema,
				orderBy: {
					createdAt: "asc",
				},
			})
			if (!budgetResponse) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `No budget with userId '${userId}'`,
				})
			}
			return budgetResponse
		}),
	transactionsByUserId: publicProcedure
		.input(
			z.object({
				userId: z.string(),
			})
		)
		.query(async ({ input }) => {
			const { userId } = input
			const budgetResponse = await prisma.budgetTransaction.findMany({
				where: {
					userId,
				},
				orderBy: {
					createdAt: "asc",
				},
			})
			if (!budgetResponse) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `No budget with userId '${userId}'`,
				})
			}
			return budgetResponse
		}),
	// transactionsByUserId: publicProcedure
	// 	.input(
	// 		z.object({
	// 			userId: z.string(),
	// 		})
	// 	)
	// 	.query(async ({ input }) => {
	// 		const { userId } = input
	// 		const budgetResponse = await prisma.budgetTransaction.findMany({
	// 			where: {
	// 				userId,
	// 			},
	// 		})
	// 		if (!budgetResponse) {
	// 			throw new TRPCError({
	// 				code: "NOT_FOUND",
	// 				message: `No budget with userId '${userId}'`,
	// 			})
	// 		}
	// 		return budgetResponse
	// 	}),
	delete: publicProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			const { id } = input
			await prisma.budget.delete({
				where: { id },
			})
			return {
				id,
			}
		}),
})
