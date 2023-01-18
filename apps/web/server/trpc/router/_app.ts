import { router } from "../trpc"
import { accountsRouter } from "./accounts"
import { assetRouter } from "./assets"
import { authRouter } from "./auth"
import { budgetRouter } from "./budget"
import { cryptocurrencyRouter } from "./cryptocurrency"
import { logRouter } from "./logs"
import { marketsRouter } from "./markets"
import { settingsRouter } from "./settings"
import { userRouter } from "./user"

export const appRouter = router({
	auth: authRouter,
	accounts: accountsRouter,
	budget: budgetRouter,
	cryptocurrency: cryptocurrencyRouter,
	markets: marketsRouter,
	settings: settingsRouter,
	user: userRouter,
	logs: logRouter,
	assets: assetRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
