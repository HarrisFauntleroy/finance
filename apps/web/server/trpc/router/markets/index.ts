import { prisma } from "@alchemical-finance/database";
import { MarketType } from "@alchemical-finance/database/generated/prisma-client";

import { publicProcedure, router } from "../../trpc";

import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const createMarketInput = z.object({
  name: z.string(),
  ticker: z.string(),
  description: z.string(),
  currency: z.string(),
  price: z.string(),
  priceChange24h: z.string(),
  priceChange24hPercent: z.string(),
  marketCap: z.string(),
  marketCapRank: z.string(),
  type: z.nativeEnum(MarketType),
  image: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const updateMarketInput = createMarketInput.extend({
  id: z.string(),
});

export const marketsRouter = router({
  create: publicProcedure
    .input(createMarketInput)
    .mutation(async ({ input: data }) => {
      return prisma.market.create({ data });
    }),

  update: publicProcedure
    .input(updateMarketInput)
    .mutation(async ({ input: data }) => {
      const { ticker, type } = data;
      return prisma.market.update({
        where: {
          ticker_type: {
            ticker,
            type,
          },
        },
        data,
      });
    }),

  // Soft delete, worker clears all things that are marked deleted after 7 days by the worker app
  delete: publicProcedure
    .input(
      z.object({
        name: z.string(),
        ticker: z.string(),
        type: z.nativeEnum(MarketType),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.market.update({
        where: {
          ticker_type: {
            ticker: input.ticker,
            type: input.type,
          },
        },
        data: {
          deletedAt: new Date(),
          deleted: true,
        },
      });
    }),

  deleteQueue: publicProcedure.query(async () => {
    return prisma.market.findMany({
      where: {
        deleted: true,
      },
    });
  }),

  all: publicProcedure.input(createMarketInput).query(async () => {
    const market = await prisma.market.findMany();
    if (!market) {
      throw new TRPCError({
        code: "NOT_FOUND",
      });
    }
    return market;
  }),

  byName: publicProcedure
    .input(
      z.object({
        name: z.string(),
        ticker: z.string(),
        type: z.nativeEnum(MarketType),
      })
    )
    .query(async ({ input }) => {
      const { ticker, type } = input;
      const market = await prisma.market.findUnique({
        where: {
          ticker_type: {
            ticker,
            type,
          },
        },
      });
      if (!market) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }
      return market;
    }),

  listMarkets: publicProcedure.input(createMarketInput).query(async () => {
    const market = await prisma.market.findMany({
      select: {
        name: true,
        ticker: true,
        image: true,
      },
    });
    if (!market) {
      throw new TRPCError({
        code: "NOT_FOUND",
      });
    }
    return market;
  }),

  forex: publicProcedure.query(async () => {
    const market = await prisma.market.findMany({
      where: {
        type: MarketType.CASH,
      },
      select: {
        name: true,
        currency: true,
        ticker: true,
        image: true,
        price: true,
        priceChange24h: true,
        priceChange24hPercent: true,
        updatedAt: true,
      },
    });
    if (!market) {
      throw new TRPCError({
        code: "NOT_FOUND",
      });
    }
    return market;
  }),

  cryptocurrency: publicProcedure.query(async () => {
    const cryptocurrency = await prisma.market.findMany({
      where: {
        type: MarketType.CRYPTOCURRENCY,
      },
      select: {
        name: true,
        currency: true,
        ticker: true,
        marketCap: true,
        marketCapRank: true,
        image: true,
        price: true,
        priceChange24h: true,
        priceChange24hPercent: true,
        updatedAt: true,
      },
      orderBy: { marketCapRank: "asc" },
      take: 100,
    });
    if (!cryptocurrency) {
      throw new TRPCError({
        code: "NOT_FOUND",
      });
    }
    return cryptocurrency;
  }),
});
