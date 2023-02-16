import { router } from "../trpc"
import { assetTransactionRouter } from "./assetTransaction"
import { assetRouter } from "./assets"
import { authRouter } from "./auth"
import { budgetRouter } from "./budget"
import { budgetTransactionRouter } from "./budgetTransaction"
import { logRouter } from "./logs"
import { marketsRouter } from "./markets"
import { settingsRouter } from "./settings"
import { userRouter } from "./user"

export const appRouter = router({
	auth: authRouter,
	budget: budgetRouter,
	markets: marketsRouter,
	settings: settingsRouter,
	user: userRouter,
	logs: logRouter,
	assets: assetRouter,
	budgetTransactions: budgetTransactionRouter,
	assetTransactions: assetTransactionRouter,
})

export type AppRouter = typeof appRouter
