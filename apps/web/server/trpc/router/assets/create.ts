import { prisma } from "database"
import { AccountConnection, Category } from "database/generated/prisma-client"
import { z } from "zod"

export const createAssetInput = z.object({
	userId: z.string(),
	name: z.string(),
	connection: z.nativeEnum(AccountConnection).nullable(),
	currency: z.string().max(3).min(3),
	value: z.string(),
	category: z.nativeEnum(Category),
	marketId: z.string().nullable(),
	balance: z.string(),
	targetBalance: z.string(),
	costBasis: z.string(),
	interestBearingBalance: z.string(),
	incomeRate: z.string(),
	walletAddress: z.string().nullable(),
	apiKey: z.string().nullable(),
	apiSecret: z.string().nullable(),
})

export async function createAsset(data: z.infer<typeof createAssetInput>) {
	return await prisma.asset.create({ data })
}
