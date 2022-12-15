/** Prisma schemas for retrieving data */
import { ColorScheme, Prisma } from "database/generated/prisma-client"
import { z } from "zod"

export const SettingsSelectSchema = Prisma.validator<Prisma.SettingsSelect>()({
	id: true,
	userId: true,
	userCurrency: true,
	userLanguage: true,
	preferredColorScheme: true,
})

/** Zod schemas for manipulating data */
export const SettingsSchema = z.object({
	id: z.string(),
	userId: z.string(),
	preferredColorScheme: z.nativeEnum(ColorScheme),
	userCurrency: z.string(),
	userLanguage: z.string(),
})
