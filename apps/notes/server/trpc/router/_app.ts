import { router } from "../trpc"
import { authRouter } from "./auth"
import { noteRouter } from "./notes"
import { userRouter } from "./user"

export const appRouter = router({
	auth: authRouter,
	notes: noteRouter,
	user: userRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
