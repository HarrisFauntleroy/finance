import { prisma } from 'database';

import { createAssetInput } from './create';

import { z } from 'zod';

export const updateAssetInput = createAssetInput.extend({
  id: z.string(),
});

export async function updateAsset(data: z.infer<typeof updateAssetInput>) {
  return await prisma.asset.update({ where: { id: data.id }, data });
}
