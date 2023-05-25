import { prisma } from "database";

import { publicProcedure, router } from "../../trpc";
import { byId } from "../schema";

import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const userRouter = router({
  all: publicProcedure.query(async () => {
    return await prisma.user
      .findMany({
        select: {
          id: true,
          name: true,
          image: true,
          role: true,
        },
      })
      .catch(() => {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      });
  }),

  delete: publicProcedure.input(byId).mutation(async ({ input }) => {
    return prisma.user.update({
      where: { id: input.id },
      data: {
        deletedAt: new Date(),
        deleted: true,
      },
    });
  }),

  deleteQueue: publicProcedure.query(async () => {
    return prisma.user.findMany({
      where: {
        deleted: true,
      },
    });
  }),

  byId: publicProcedure.input(byId).query(async ({ input }) => {
    const { id } = input;
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
      },
    });
    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `No user with id '${id}'`,
      });
    }

    return user;
  }),

  findVerifiedUsers: publicProcedure.query(async () => {
    return prisma.user.findMany({
      where: {
        emailVerified: {
          not: null,
        },
      },
    });
  }),

  findAdminUsers: publicProcedure.query(async () => {
    return prisma.user.findMany({
      where: {
        role: "ADMIN",
      },
    });
  }),

  findUsersWithProviderAccount: publicProcedure
    .input(z.object({ provider: z.string() }))
    .query(async ({ input }) => {
      const { provider } = input;
      return prisma.user.findMany({
        where: {
          accounts: {
            some: {
              provider,
            },
          },
        },
      });
    }),

  findUsersWithBudget: publicProcedure.query(async () => {
    return prisma.user.findMany({
      where: {
        budgets: {
          some: {},
        },
      },
    });
  }),

  findUsersWithCryptocurrency: publicProcedure.query(async () => {
    return prisma.user.findMany({
      where: {
        cryptocurrency: {
          some: {},
        },
      },
    });
  }),

  findUsersWithSession: publicProcedure.query(async () => {
    return prisma.user.findMany({
      where: {
        sessions: {
          some: {},
        },
      },
    });
  }),

  findInactiveUsers: publicProcedure.query(async () => {
    return prisma.user.findMany({
      where: {
        sessions: {
          none: {
            expires: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
            },
          },
        },
      },
    });
  }),

  dashboard: publicProcedure.query(async () => {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          image: true,
          role: true,
        },
      });

      const verifiedUsers = await prisma.user.findMany({
        where: { emailVerified: { not: null } },
      });
      // Add similar code for other user types
      return {
        users,
        statistics: [
          {
            statLabel: "Verified users",
            statNumber: verifiedUsers.length,
            statHelpText: "Users who have verified their email:",
            list: verifiedUsers.map((user) => ({
              id: user.id,
              name: user.name,
            })),
          },
          // Add similar stats for other user types
        ],
      };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to fetch dashboard data: ${(error as Error).message}`,
      });
    }
  }),
});
