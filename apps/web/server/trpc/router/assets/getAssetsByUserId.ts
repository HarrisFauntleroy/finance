import { prisma } from 'database';

export const getAssetsByUserId = (userId: string) => {
  return prisma.asset.findMany({
    where: {
      userId,
      parentId: null,
    },
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
  });
};
