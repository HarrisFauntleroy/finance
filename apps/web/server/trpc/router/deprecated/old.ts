import { calculateAssetValueOverview, calculateManyAssets } from 'common';
import { prisma } from 'database';

import { getExchangeRates, getUserCurrency } from '~/server/api';

import { publicProcedure, router } from '../../trpc';

import { TRPCError } from '@trpc/server';
import { z } from 'zod';

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

export const assetRouter = router({
  all: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input;
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
      });
      if (!asset) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No asset with id '${id}'`,
        });
      }

      return asset;
    }),
  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input;
      const asset = await prisma.asset.findUnique({
        where: {
          id,
        },
        include: {
          market: true,
          subAssets: {
            include: {
              market: true,
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
      });
      if (!asset) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No asset with id '${id}'`,
        });
      }

      return asset;
    }),
  byUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { userId } = input;

      const data = await prisma.asset.findMany({
        where: {
          userId,
          // This keeps sub accounts nested
          parentId: null,
        },
        include: {
          market: true,
          subAssets: {
            include: {
              market: true,
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
      });

      const userCurrency = await getUserCurrency(userId);

      const exchangeRates = await getExchangeRates();

      // If no asset was found for the user, throw an error
      if (!data) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No asset with userId '${userId}'`,
        });
      }
      // Calculate the asset values using the provided data, exchange rates, and user currency
      return calculateManyAssets({
        data,
        exchangeRates,
        userCurrency,
      });
    }),
  overviewByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { userId } = input;
      const data = await prisma.asset.findMany({
        where: {
          userId,
          parentId: null,
        },
        include: {
          market: true,
          subAssets: {
            include: {
              market: true,
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
      });

      const userCurrency = await getUserCurrency(userId);

      const exchangeRates = await getExchangeRates();

      if (!data) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No asset with userId '${userId}'`,
        });
      }

      /** Calculate asset for overview */
      const assets = calculateManyAssets({
        data,
        exchangeRates,
        userCurrency,
      });

      /** Overview should be its own router */
      const {
        totalValue,
        totalCostBasis,
        unrealisedGain,
        saleableValue,
        totalEstimatedYearlyReturn,
      } = calculateAssetValueOverview(assets);

      return {
        totalValue: totalValue,
        saleableValue: saleableValue,
        totalCostBasis: totalCostBasis,
        unrealisedGain: unrealisedGain,
        totalEstimatedYearlyReturn: totalEstimatedYearlyReturn,
      };
    }),
  targets: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { userId } = input;
      const data = await prisma.asset.findMany({
        where: {
          userId,
        },
        select: {
          balance: true,
          targetBalance: true,
          marketId: true,
          name: true,
        },
      });

      if (!data) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No asset with userId '${userId}'`,
        });
      }
      return data;
    }),
});
