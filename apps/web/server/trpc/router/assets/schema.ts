import { AccountConnection, Prisma } from "database/generated/prisma-client"
import { z } from "zod"
import { decimal } from "~/utils/decimal"

/** Prisma schemas for retrieving data */

export const CryptoSelectSchema = Prisma.validator<Prisma.AssetSelect>()({
	id: true,
	userId: true,
	market: true,
	apiKey: true,
	balance: true,
	marketId: true,
	currency: true,
	parentId: true,
	costBasis: true,
	apiSecret: true,
	createdAt: true,
	updatedAt: true,
	name: true,
	realisedGain: true,
	walletAddress: true,
	targetBalance: true,
	account: true,
	interestBearingBalance: true,
	user: { select: { settings: true } },
})

/** Zod schemas for manipulating data */

export const AssetSchema = z.object({
	userId: z.string(),
	displayName: z.string(),
	accountConnection: z.nativeEnum(AccountConnection).nullable(),
	currency: z.string(),
	marketId: z.string().nullable(),
	balance: decimal(),
	targetBalance: decimal(),
	costBasis: decimal(),
	interestBearingBalance: decimal(),
	incomeRate: decimal(),
	walletAddress: z.string().nullable(),
	apiKey: z.string().nullable(),
	apiSecret: z.string().nullable(),
})

export const AssetSchemaWithId = AssetSchema.extend({
	id: z.string(),
})
