import { AccountConnection, Category } from "database/generated/prisma-client"
import { z } from "zod"
import { decimal } from "~/utils/decimal"

export const AssetZod = z.object({
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

export const AssetWithIdZod = AssetZod.extend({
	id: z.string(),
})

export const AssetWithParentId = AssetZod.extend({
	parentId: z.string(),
})
