import { publicProcedure, router } from "../../trpc"
import { NotesSchema, NotesSelectSchema } from "./schema"
import { prisma } from "database-notes"
import { z } from "zod"

/**
 * Routers: Notes
 * @Queries
 * note.byId ✅
 * note.byUserId ✅
 * @Mutations
 * note.create ✅
 * note.update ✅
 * note.delete ✅
 */

export const noteRouter = router({
	create: publicProcedure
		.input(
			z.object({
				authorId: z.string(),
				title: z.string(),
				body: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			return prisma.note.create({
				data: input,
			})
		}),
	read: publicProcedure.input(NotesSchema).query(async ({ input }) => {
		// TODO
		console.log("input", input)
	}),

	/**
	 * When a user signs in
	 * update is called to ensure that the user
	 * has default values set such as default language and currency
	 */
	update: publicProcedure
		.input(
			z.object({
				id: z.string(),
				authorId: z.string(),
				title: z.string(),
				body: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			return prisma.note.upsert({
				where: { id: input.id },
				update: input,
				create: input,
				select: NotesSelectSchema,
			})
		}),
	// Soft delete, worker clears all things that are marked deleted after 7 days by the worker app
	delete: publicProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			return prisma.note.update({
				where: { id: input.id },
				data: {
					deletedAt: new Date(),
					deleted: true,
				},
			})
		}),
	deleteQueue: publicProcedure.query(async () => {
		return prisma.note.findMany({
			where: {
				deleted: true,
			},
		})
	}),
	byUserId: publicProcedure
		.input(
			z.object({
				authorId: z.string().optional(),
			})
		)
		.query(async ({ input }) => {
			const { authorId } = input
			const note = await prisma.note.findMany({
				where: {
					authorId,
				},
				select: NotesSelectSchema,
			})
			if (!note) {
				return [{ title: "No notes found" }]
			}
			return note
		}),
	byId: publicProcedure
		.input(
			z.object({
				id: z.string().optional(),
			})
		)
		.query(async ({ input }) => {
			const { id } = input
			const note = await prisma.note.findUnique({
				where: {
					id,
				},
				select: {
					id: true,
					title: true,
					body: true,
					authorId: true,
					createdAt: true,
					updatedAt: true,
					deleted: true,
					deletedAt: true,
				},
			})
			if (!note) {
				throw new Error(`Note with id ${id} not found`)
			}
			return note
		}),
})
