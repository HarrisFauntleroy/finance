import { prisma } from 'database';

export const getAssetsWithMarket = (userId: string) =>
  prisma.asset.findMany({
    where: { userId, category: { not: null } },
    include: { market: true },
  });
