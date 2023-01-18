import { Prisma } from "database/generated/prisma-client"
import { z } from "zod"
import { decimal } from "~/utils/decimal"

/** Prisma schemas for retrieving data */
// model Budget {
//   id           String           @unique @default(cuid())
//   name         String
//   userId       String
//   user         User             @relation(fields: [userId], references: [id])
//   envelopes    BudgetEnvelope[]
//   income       Income[]
//   totalBalance Decimal          @default(0)
//   createdAt    DateTime         @default(now())
//   updatedAt    DateTime         @default(now()) @updatedAt
//   deleted      Boolean          @default(false)
//   deletedAt    DateTime?
// }

export const BudgetEnvelopeSchema =
	Prisma.validator<Prisma.BudgetEnvelopeSelect>()({
		id: true,
		name: true,
		budgetId: true,
		createdAt: true,
		updatedAt: true,
	})

export const BudgetSchema = Prisma.validator<Prisma.BudgetSelect>()({
	id: true,
	name: true,
	userId: true,
	user: true,
	envelopes: true,
	income: true,
	totalBalance: true,
	createdAt: true,
	updatedAt: true,
	deleted: true,
	deletedAt: true,
})

/** Zod schemas for manipulating data */

export const BudgetSchemaZod = z.object({
	name: z.string(),
	totalBalance: decimal(),
	createdAt: z.date(),
	updatedAt: z.date(),
})

export const BudgetSchemaWithIdZod = BudgetSchemaZod.extend({
	id: z.string(),
})

export const BudgetAssetSchema = z.object({
	name: z.string(),
	category: z.string(),
	amount: z.string(),
	frequency: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
	userId: z.string(),
	budgetId: z.string(),
})

export const BudgetAssetSchemaWithId = BudgetAssetSchema.extend({
	id: z.string(),
})
