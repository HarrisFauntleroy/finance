import { TRPCError } from "@trpc/server";
import { prisma } from "database";
import { MarketType } from "database/generated/prisma-client";
import { z } from "zod";
import { publicProcedure, router } from "../../trpc";

export const createMarketInput = z.object({
  name: z.string(),
  ticker: z.string().length(3),
  currency: z.string().length(3),
  description: z.string(),
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
      const { ticker, currency } = data;
      return prisma.market.update({
        where: {
          ticker_currency: {
            ticker,
            currency,
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
        ticker: z.string().length(3),
        currency: z.string().length(3),
      })
    )
    .mutation(async ({ input: { ticker, currency } }) => {
      return prisma.market.update({
        where: {
          ticker_currency: {
            ticker: ticker,
            currency: currency,
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

  all: publicProcedure.query(async () => {
    const markets = await prisma.market.findMany({
      select: {
        // image: "https://img.icons8.com/clouds/256/000000/futurama-bender.png",
        // label: "Bender Bending Rodríguez",
        // value: "Bender Bending Rodríguez",
        // description: "Fascinated with cooking",
        image: true,
        name: true,
        ticker: true,
        currency: true,
        description: true,
      },
    });
    if (!markets) {
      throw new TRPCError({
        code: "NOT_FOUND",
      });
    }
    return markets.map((market) => ({
      image: market.image || "",
      label: `${market.name} (${market.ticker})`,
      value: `${market.ticker}-(${market.currency})`,
      description: market.description || "No description",
    }));
  }),

  byName: publicProcedure
    .input(
      z.object({
        name: z.string(),
        ticker: z.string().length(3),
        currency: z.string().length(3),
      })
    )
    .query(async ({ input }) => {
      const { ticker, currency } = input;
      const market = await prisma.market.findUnique({
        where: {
          ticker_currency: {
            ticker,
            currency,
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
        id: true,
        name: true,
        currency: true,
        ticker: true,
        image: true,
        price: true,
        priceChange24h: true,
        priceChange24hPercent: true,
        updatedAt: true,
        marketCapRank: true,
        marketCap: true,
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
        id: true,
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
