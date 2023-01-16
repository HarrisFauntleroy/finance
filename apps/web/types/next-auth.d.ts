/**
 *
 * Next Auth
 *
 */
import type { User } from "database/generated/prisma-client"

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession`
	 * and received as a prop on the `SessionProvider` React Context
	 */
	type Session = {
		userId: string
		user: User
	}
}

declare module "next-auth/jwt" {
	/** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
	type JWT = {
		/** OpenID ID Token */
		idToken?: string
	}
}
