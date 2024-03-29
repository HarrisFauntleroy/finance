import { prisma } from "database";

import { publicProcedure, router } from "../../trpc";
import { BudgetSchema } from "../budgetEnvelope/schema";

import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const budgetRouter = router({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        userId: z.string(),
        totalBalance: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.budget.create({
        data: input,
        select: BudgetSchema,
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        userId: z.string(),
        totalBalance: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return await prisma.budget
        .update({
          where: { id },
          data,
          select: BudgetSchema,
        })
        .catch(() => {
          throw new TRPCError({
            code: "NOT_FOUND",
          });
        });
    }),

  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { id } = input;
      const budgetResponse = await prisma.budget.findUnique({
        where: {
          id,
        },
        select: BudgetSchema,
      });
      if (!budgetResponse) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No budget with id '${id}'`,
        });
      }
      return budgetResponse;
    }),

  byUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { userId } = input;
      const budgetResponse = await prisma.budget.findMany({
        where: {
          userId,
        },
        select: BudgetSchema,
        orderBy: {
          createdAt: "asc",
        },
      });
      if (!budgetResponse) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No budget with userId '${userId}'`,
        });
      }
      return budgetResponse;
    }),

  transactionsByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { userId } = input;
      const budgetResponse = await prisma.budgetTransaction.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
      if (!budgetResponse) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No budget with userId '${userId}'`,
        });
      }
      return budgetResponse;
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
      const { id } = input;
      await prisma.budget.delete({
        where: { id },
      });
      return {
        id,
      };
    }),
});
