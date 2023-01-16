/** Prisma schemas for retrieving data */
import { Prisma } from "database-notes/generated/prisma-client"
import { z } from "zod"

export const NotesSelectSchema = Prisma.validator<Prisma.NoteSelect>()({
	id: true,
	title: true,
	body: true,
	authorId: true,
	author: true,
	createdAt: true,
	updatedAt: true,
	deleted: true,
	deletedAt: true,
})

/** Zod schemas for manipulating data */
export const NotesSchema = z.object({
	id: z.string(),
	authorId: z.string(),
	title: z.string(),
	body: z.string(),
	deleted: z.boolean(),
})
