import { Prisma } from "database/generated/prisma-client"
import { z } from "zod"

/** Prisma schemas for retrieving data */

export const BudgetAssetSelectSchema =
	Prisma.validator<Prisma.BudgetEnvelopeSelect>()({
		id: true,
		name: true,
		budgetId: true,
		createdAt: true,
		updatedAt: true,
	})

export const BudgetSelectSchema = Prisma.validator<Prisma.BudgetSelect>()({
	id: true,
	name: true,
	income: true,
	userId: true,
	createdAt: true,
	updatedAt: true,
	deleted: true,
	deletedAt: true,
})

/** Zod schemas for manipulating data */

export const BudgetSchema = z.object({
	name: z.string(),
	userId: z.string(),
})

export const BudgetSchemaWithId = BudgetSchema.extend({
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
