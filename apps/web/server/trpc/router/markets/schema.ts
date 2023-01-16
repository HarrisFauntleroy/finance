import { MarketType, Prisma } from "database/generated/prisma-client"
import { z } from "zod"
import { decimal } from "~/utils/decimal"

/** Prisma schemas for retrieving data */

export const MarketSelectSchema = Prisma.validator<Prisma.MarketSelect>()({
	name: true,
	ticker: true,
	description: true,
	currency: true,
	price: true,
	priceChange24h: true,
	priceChange24hPercent: true,
	marketCap: true,
	marketCapRank: true,
	type: true,
	image: true,
	createdAt: true,
	updatedAt: true,
})

/** Zod schemas for manipulating data */

export const MarketSchema = z.object({
	name: z.string(),
	ticker: z.string(),
	description: z.string(),
	currency: z.string(),
	price: decimal(),
	priceChange24h: decimal(),
	priceChange24hPercent: decimal(),
	marketCap: decimal(),
	marketCapRank: decimal(),
	type: z.nativeEnum(MarketType),
	image: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
})

export const MarketSchemaWithId = z.object({
	id: z.string(),
})
