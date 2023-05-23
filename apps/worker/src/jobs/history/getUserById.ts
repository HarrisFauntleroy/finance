import { prisma } from "database";

export const getUserById = (id: string) =>
  prisma.user.findUnique({
    where: {
      id,
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
    },
  });
