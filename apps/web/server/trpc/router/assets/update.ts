import { prisma } from "@alchemical-finance/database";

import { Asset } from "@alchemical-finance/database/generated/prisma-client";

export async function updateAsset(data: Asset) {
  return await prisma.asset.update({ where: { id: data.id }, data });
}
