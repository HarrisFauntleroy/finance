import { publicProcedure, router } from "../../trpc"
import { UserSchema, UserSelectSchema } from "./schema"
import { TRPCError } from "@trpc/server"
import { prisma } from "database"
import { z } from "zod"

/**
 * Routers: User
 * @Queries
 * user.byId ✅
 * user.byUserId ✅
 * @Mutations
 * user.create ✅
 * user.update ✅
 * user.delete ✅
 */

export const userRouter = router({
	create: publicProcedure.input(UserSchema).mutation(async ({ input }) => {
		// TODO
		console.log("input", input)
	}),
	all: publicProcedure.query(async () => {
		const users = await prisma.user.findMany({
			select: {
				id: true,
				name: true,
				image: true,
				role: true,
			},
		})
		if (!users) {
			throw new TRPCError({
				code: "NOT_FOUND",
				message: `No users found'`,
			})
		}

		return users
	}),
	update: publicProcedure.input(UserSchema).mutation(async ({ input }) => {
		// TODO
		console.log("input", input)
	}),
	// Soft delete, worker clears all things that are marked deleted after 7 days by the worker app
	delete: publicProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			return prisma.user.update({
				where: { id: input.id },
				data: {
					deletedAt: new Date(),
					deleted: true,
				},
			})
		}),
	deleteQueue: publicProcedure.query(async () => {
		return prisma.user.findMany({
			where: {
				deleted: true,
			},
		})
	}),
	byId: publicProcedure.input(UserSchema).query(async ({ input }) => {
		const { id } = input
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
			select: UserSelectSchema,
		})
		if (!user) {
			throw new TRPCError({
				code: "NOT_FOUND",
				message: `No user with id '${id}'`,
			})
		}

		return user
	}),
})
