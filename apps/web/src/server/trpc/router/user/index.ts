import { publicProcedure, router } from "../../trpc"
import { UserSchema, UserSelectSchema } from "./schema"
import { TRPCError } from "@trpc/server"
import { prisma } from "database"

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
	read: publicProcedure.input(UserSchema).mutation(async ({ input }) => {
		// TODO
		console.log("input", input)
	}),
	update: publicProcedure.input(UserSchema).mutation(async ({ input }) => {
		// TODO
		console.log("input", input)
	}),
	delete: publicProcedure.input(UserSchema).mutation(async ({ input }) => {
		// TODO
		console.log("input", input)
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
