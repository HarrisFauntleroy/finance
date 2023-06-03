import { TRPCError } from "@trpc/server";
import { calculateAssetValue, calculateAssetValueOverview } from "common";
import { prisma } from "database";
import { type Prisma } from "database/generated/prisma-client";
import { z } from "zod";
import { getExchangeRates, getUserCurrency } from "../../../api";
import { publicProcedure, router } from "../../trpc";
import { deleteAsset } from "./delete";
import { getAssetById } from "./getAssetById";
import { getAssetsByUserId } from "./getAssetsByUserId";
import { getPortfolioAllocation } from "./getPortfolioAllocation";

// CREATE OR UPDATE ASSET SCHEMA ------------------------------------------------

export const createOrUpdateAssetSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  name: z.string(),
  currency: z.string(),
  balance: z.string(),
});

export type CreateOrUpdateAssetSchema = z.infer<
  typeof createOrUpdateAssetSchema
>;

// -----------------------------------------------------------------------------

export const assetRouter = router({
  createOrUpdate: publicProcedure
    .input(createOrUpdateAssetSchema)
    .mutation(async function ({ input }) {
      return input.id
        ? prisma.asset.update({ where: { id: input.id }, data: input })
        : prisma.asset.create({
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
      return await deleteAsset(id);
    }),

  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input: { id } }) => {
      return getAssetById(id);
    }),

  byUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input: { userId } }) => {
      const userCurrency = await getUserCurrency(userId);
      const exchangeRates = await getExchangeRates();
      const assets = await getAssetsByUserId(userId);

      return assets.map((asset) =>
        calculateAssetValue(asset, exchangeRates, userCurrency)
      );
    }),

  overviewAccountsListByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input: { userId } }) => {
      const userCurrency = await getUserCurrency(userId);
      const exchangeRates = await getExchangeRates();
      const assets: Prisma.PromiseReturnType<typeof getAssetsByUserId> =
        await getAssetsByUserId(userId);

      return assets.map((asset) =>
        calculateAssetValue(asset, exchangeRates, userCurrency)
      );
    }),

  overviewByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input: { userId } }) => {
      const userCurrency = await getUserCurrency(userId);
      const exchangeRates = await getExchangeRates();
      const assets = await getAssetsByUserId(userId);

      // Why this intermediary step?
      // I think this is the stage at which we add computed properties
      const calculatedAssets = assets.map((asset) =>
        calculateAssetValue(asset, exchangeRates, userCurrency)
      );

      // Distinction needed? up and down

      // Then we calculate overview values, which are?
      return calculateAssetValueOverview(calculatedAssets);
    }),

  targets: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input: { userId } }) => {
      return await getAssetsByUserId(userId);
    }),

  byUserIdOld: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input: { userId } }) => {
      const result = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          assets: {
            include: {
              market: true,
              transactions: true,
              subAssets: {
                include: {
                  market: true,
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
          },
          portfolioSnapshot: true,
        },
      });

      if (!result) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }

      const { portfolioSnapshot, assets } = result;

      const userCurrency = await getUserCurrency(userId);
      const exchangeRates = await getExchangeRates();
      const calculatedAssets = assets.map((asset) =>
        calculateAssetValue(asset, exchangeRates, userCurrency)
      );
      const { totalValue, totalCostBasis, unrealisedGain, saleableValue } =
        calculateAssetValueOverview(calculatedAssets);

      return {
        totalValue,
        saleableValue,
        totalCostBasis,
        unrealisedGain,
        assets,
        portfolioSnapshot,
      };
    }),

  allocation: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input: { userId } }) => {
      return getPortfolioAllocation(userId);
    }),

  historyByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input: { userId } }) => {
      const data = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          portfolioSnapshot: true,
        },
      });

      if (!data) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }

      return data;
    }),
});
