import { prisma } from "@alchemical-finance/database";

import { type Asset } from "@alchemical-finance/database/generated/prisma-client";

export async function createAsset(data: Asset) {
  return await prisma.asset.create({
    data,
  });
}
