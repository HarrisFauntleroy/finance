import { prisma } from "database"
import { AccountConnection, Category } from "database/generated/prisma-client"
import { z } from "zod"
import { decimal } from "~/utils/decimal"

export const createAssetInput = z.object({
	userId: z.string(),
	name: z.string(),
	connection: z.nativeEnum(AccountConnection).nullable(),
	currency: z.string().max(3).min(3),
	value: decimal(),
	category: z.nativeEnum(Category),
	marketId: z.string().nullable(),
	balance: decimal().default(0),
	targetBalance: decimal().default(0),
	costBasis: decimal().default(0),
	interestBearingBalance: decimal().default(0),
	incomeRate: decimal().default(0),
	walletAddress: z.string().nullable(),
	apiKey: z.string().nullable(),
	apiSecret: z.string().nullable(),
})

export async function createAsset(data: z.infer<typeof createAssetInput>) {
	return await prisma.asset.create({ data })
}
