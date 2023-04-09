import { prisma } from 'database';

import { Asset } from '~/../../packages/database/generated/zod';

export async function updateAsset(data: Asset) {
  return await prisma.asset.update({ where: { id: data.id }, data });
}
