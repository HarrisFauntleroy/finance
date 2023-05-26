import { prisma } from "@alchemical-finance/database";

export const getAssetById = (id: string) =>
  prisma.asset.findUnique({
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
