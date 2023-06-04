import { prisma } from "database";

import { publicProcedure, router } from "../../trpc";
import { byId, byUserId } from "../schema";

import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { deleteAssetTransaction } from "./delete";

// CREATE OR UPDATE ASSET SCHEMA ------------------------------------------------
export const createOrUpdateAssetTransactionSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  baseCurrency: z.string(),
  quantity: z.string(),
  toAsset: z.string(),
  transactionType: z.string(),
});

export type CreateOrUpdateAsseTransactionSchema = z.infer<
  typeof createOrUpdateAssetTransactionSchema
>;
// -----------------------------------------------------------------------------

export const assetTransactionRouter = router({
  createOrUpdate: publicProcedure
    .input(createOrUpdateAssetTransactionSchema)
    .mutation(async function ({ input }) {
      return input.id
        ? prisma.assetTransaction.update({
            where: { id: input.id },
            data: input,
          })
        : prisma.assetTransaction.create({
            data: input,
          });
    }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input: { id } }) => {
      return await deleteAssetTransaction(id);
    }),

  all: publicProcedure.input(byId).query(async ({ input }) => {
    const { id } = input;
    return await prisma.assetTransaction
      .findUnique({
        where: {
          id,
        },
      })
      .catch(() => {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      });
  }),

  byId: publicProcedure.input(byId).query(async ({ input }) => {
    const { id } = input;
    return await prisma.assetTransaction
      .findUnique({
        where: {
          id,
        },
      })
      .catch(() => {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      });
  }),

  byUserId: publicProcedure.input(byUserId).query(async ({ input }) => {
    const { userId } = input;
    return await prisma.assetTransaction
      .findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: "asc",
        },
      })
      .catch(() => {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      });
  }),
});
