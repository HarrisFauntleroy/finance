// @ts-check

/**
 * This file is included in `/next.config.mjs` which ensures the app isn't built with invalid env vars.
 * It has to be a `.mjs`-file to be imported there.
 */
import { env as clientEnv, formatErrors } from "./client.mjs"
import { serverSchema } from "./schema.mjs"

const SERVER_ENV = serverSchema.safeParse(process.env)

if (!SERVER_ENV.success) {
	console.error(
		"❌ Invalid environment variables:\n",
		...formatErrors(SERVER_ENV.error.format())
	)
	throw new Error("Invalid environment variables")
}

for (let key of Object.keys(SERVER_ENV.data)) {
	if (key.startsWith("NEXT_PUBLIC_")) {
		console.warn("❌ You are exposing a server-side env-variable:", key)

		throw new Error("You are exposing a server-side env-variable")
	}
}

export const env = { ...SERVER_ENV.data, ...clientEnv }
