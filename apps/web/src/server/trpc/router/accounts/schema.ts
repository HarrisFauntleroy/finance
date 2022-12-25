/** Prisma schemas for retrieving data */
import { Prisma } from "database/generated/prisma-client"

export const AccountSelectSchema = Prisma.validator<Prisma.UserSelect>()({
	id: true,
	cryptocurrency: {
		include: {
			market: true,
			Children: true,
		},
	},
})
