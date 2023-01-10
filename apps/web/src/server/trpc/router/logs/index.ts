import { publicProcedure, router } from "../../trpc"
import { prisma } from "database"

/**
 * Routers: Log
 * @Queries
 * log.byId ✅
 * log.byUserId ✅
 * @Mutations
 * log.create ✅
 * log.update ✅
 * log.delete ✅
 */

export const logRouter = router({
	read: publicProcedure.query(async () => {
		return await prisma.log.findMany({
			orderBy: { createdAt: "desc" },
		})
	}),
})
