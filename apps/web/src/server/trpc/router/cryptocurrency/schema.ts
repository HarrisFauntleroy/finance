import { AccountConnection, Prisma } from "database/generated/prisma-client"
import { z } from "zod"
import { decimal } from "~/utils/decimal"

/** Prisma schemas for retrieving data */

export const CryptoSelectSchema =
	Prisma.validator<Prisma.CryptocurrencySelect>()({
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
		displayName: true,
		realisedGain: true,
		rateOfIncome: true,
		walletAddress: true,
		targetBalance: true,
		accountConnection: true,
		interestBearingBalance: true,
		user: { select: { settings: true } },
		Children: {
			select: {
				id: true,
				userId: true,
				market: true,
				apiKey: true,
				balance: true,
				marketId: true,
				parentId: true,
				costBasis: true,
				apiSecret: true,
				createdAt: true,
				updatedAt: true,
				displayName: true,
				rateOfIncome: true,
				walletAddress: true,
				targetBalance: true,
				accountConnection: true,
				interestBearingBalance: true,
			},
		},
	})

/** Zod schemas for manipulating data */

export const CryptocurrencySchema = z.object({
	userId: z.string(),
	displayName: z.string(),
	accountConnection: z.nativeEnum(AccountConnection).nullable(),
	currency: z.string(),
	marketId: z.string().nullable(),
	balance: decimal().default(0),
	targetBalance: decimal().default(0),
	costBasis: decimal().default(0),
	interestBearingBalance: decimal().default(0),
	rateOfIncome: decimal().default(0),
	walletAddress: z.string().nullable(),
	apiKey: z.string().nullable(),
	apiSecret: z.string().nullable(),
})

export const CryptocurrencySchemaWithId = CryptocurrencySchema.extend({
	id: z.string(),
})
