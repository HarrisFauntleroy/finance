import { prisma } from "database";
import { CreateOrUpdateAssetSchema } from ".";

export async function createAsset(data: CreateOrUpdateAssetSchema) {
  return await prisma.asset.create({
    data,
  });
}
