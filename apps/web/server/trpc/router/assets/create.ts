import { prisma } from "database";

import { type Asset } from "database/generated/prisma-client";

export async function createAsset(data: Asset) {
  return await prisma.asset.create({
    data,
  });
}
