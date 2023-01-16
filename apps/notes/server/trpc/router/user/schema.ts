/** Prisma schemas for retrieving data */
import { Prisma } from "database-notes/generated/prisma-client"
import { z } from "zod"

export const UserSelectSchema = Prisma.validator<Prisma.UserSelect>()({
	id: true,
	name: true,
	email: true,
	image: true,
})

/** Zod schemas for manipulating data */
export const UserSchema = z.object({
	id: z.string(),
	name: z.string(),
	userLanguage: z.string(),
})
