import { prisma } from "database";

import { publicProcedure, router } from "../../trpc";
import { byId, byUserId } from "../schema";
import {
  createBudgetTransaction,
  createBudgetTransactionInput,
} from "./create";
import { deleteBudgetTransaction } from "./delete";
import { updatBudgetransaction, updatBudgetransactionInput } from "./update";

import { TRPCError } from "@trpc/server";

export const budgetTransactionRouter = router({
  create: publicProcedure
    .input(createBudgetTransactionInput)
    .mutation(async ({ input }) => {
      return await createBudgetTransaction(input);
    }),

  update: publicProcedure
    .input(updatBudgetransactionInput)
    .mutation(async ({ input }) => {
      return await updatBudgetransaction(input);
    }),

  delete: publicProcedure.input(byId).mutation(async ({ input: { id } }) => {
    return await deleteBudgetTransaction(id);
  }),

  all: publicProcedure.input(byId).query(async ({ input: { id } }) => {
    return await prisma.asset
      .findUnique({
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
      .catch(() => {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      });
  }),

  byId: publicProcedure.input(byId).query(async ({ input: { id } }) => {
    return await prisma.asset
      .findUnique({
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
      .catch(() => {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      });
  }),

  byUserId: publicProcedure
    .input(byUserId)
    .query(async ({ input: { userId } }) => {
      return await prisma.budgetTransaction
        .findMany({
          where: {
            userId,
            // This keeps sub accounts nested
            budgetEnvelopeId: null,
          },
        })
        .catch(() => {
          throw new TRPCError({
            code: "NOT_FOUND",
          });
        });
    }),
});
