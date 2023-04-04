import { prisma } from 'database';

import { publicProcedure, router } from '../../trpc';

import { TRPCError } from '@trpc/server';

export const logRouter = router({
  read: publicProcedure.query(async () => {
    return await prisma.log
      .findMany({
        orderBy: { createdAt: 'desc' },
      })
      .catch(() => {
        throw new TRPCError({
          code: 'NOT_FOUND',
        });
      });
  }),
});
