import { publicProcedure, router } from "../../trpc"
import { BudgetSchema, BudgetSchemaWithId, BudgetSelectSchema } from "./schema"
import { TRPCError } from "@trpc/server"
import { prisma } from "database"
import { z } from "zod"

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
	create: publicProcedure.input(BudgetSchema).mutation(async ({ input }) => {
		return prisma.budget.create({
			data: input,
			select: BudgetSelectSchema,
		})
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
				select: BudgetSelectSchema,
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
				select: BudgetSelectSchema,
			})
			if (!budgetResponse) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `No budget with userId '${userId}'`,
				})
			}
			return budgetResponse
		}),
	update: publicProcedure
		.input(
			z.object({
				id: z.string(),
				userId: z.string(),
				data: BudgetSchemaWithId,
			})
		)
		.mutation(async ({ input }) => {
			const { id, data } = input
			const budgetResponse = await prisma.budget.update({
				where: { id },
				data,
				select: BudgetSelectSchema,
			})
			if (!budgetResponse) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `No budget with id '${id}'`,
				})
			}
			return budgetResponse
		}),
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
