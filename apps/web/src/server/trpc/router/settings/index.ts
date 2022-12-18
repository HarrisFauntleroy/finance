import { publicProcedure, router } from "../../trpc"
import { SettingsSchema, SettingsSelectSchema } from "./schema"
import { TRPCError } from "@trpc/server"
import { prisma } from "database"
import { z } from "zod"

/**
 * Routers: Settings
 * @Queries
 * settings.byId ✅
 * settings.byUserId ✅
 * @Mutations
 * settings.create ✅
 * settings.update ✅
 * settings.delete ✅
 */

export const settingsRouter = router({
	create: publicProcedure
		.input(
			z.object({
				userId: z.string(),
				userCurrency: z.string().min(3).max(3),
				userLanguage: z.string().min(3).max(3),
			})
		)
		.mutation(async ({ input }) => {
			return prisma.settings.create({
				data: input,
			})
		}),
	read: publicProcedure.input(SettingsSchema).query(async ({ input }) => {
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
				id: z.string().optional(),
				userId: z.string(),
				userCurrency: z.string().min(3).max(3),
				userLanguage: z.string().min(3).max(3),
			})
		)
		.mutation(async ({ input }) => {
			return prisma.settings.upsert({
				where: { userId: input.userId },
				update: input,
				create: input,
				select: SettingsSelectSchema,
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
			return prisma.settings.update({
				where: { id: input.id },
				data: {
					deletedAt: new Date(),
					deleted: true,
				},
			})
		}),
	deleteQueue: publicProcedure.query(async () => {
		return prisma.settings.findMany({
			where: {
				deleted: true,
			},
		})
	}),
	byUserId: publicProcedure
		.input(
			z.object({
				userId: z.string(),
			})
		)
		.query(async ({ input }) => {
			const { userId } = input
			const settings = await prisma.settings.findUnique({
				where: {
					userId,
				},
				select: SettingsSelectSchema,
			})
			if (!settings) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `No settings with userId '${userId}'`,
				})
			}

			return settings
		}),
})
