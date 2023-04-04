import { prisma } from 'database';

import { publicProcedure, router } from '../../trpc';
import { byId, byUserId } from '../schema';
import { createAssetTransaction, createAssetTransactionInput } from './create';
import { deleteAssetTransaction } from './delete';
import { updateAssetTransaction, updateAssetTransactionInput } from './update';

import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const assetTransactionRouter = router({
  create: publicProcedure
    .input(createAssetTransactionInput)
    .mutation(async ({ input }) => {
      return await createAssetTransaction(input);
    }),

  createChild: publicProcedure
    .input(createAssetTransactionInput.extend({ parentId: z.string() }))
    .mutation(async ({ input }) => {
      return await createAssetTransaction(input);
    }),

  update: publicProcedure
    .input(updateAssetTransactionInput)
    .mutation(async ({ input }) => {
      return await updateAssetTransaction(input);
    }),

  delete: publicProcedure.input(byId).mutation(async ({ input: { id } }) => {
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
          code: 'NOT_FOUND',
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
          code: 'NOT_FOUND',
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
          createdAt: 'asc',
        },
      })
      .catch(() => {
        throw new TRPCError({
          code: 'NOT_FOUND',
        });
      });
  }),
});
