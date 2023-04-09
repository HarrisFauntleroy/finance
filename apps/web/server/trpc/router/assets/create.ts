import { prisma } from 'database';

import { type Asset } from 'database/generated/zod/index';

export async function createAsset(data: Asset) {
  return await prisma.asset.create({
    data,
  });
}
