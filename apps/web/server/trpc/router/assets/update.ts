import { prisma } from "database";

import { Asset } from "database/generated/prisma-client";

export async function updateAsset(data: Asset) {
  return await prisma.asset.update({ where: { id: data.id }, data });
}
