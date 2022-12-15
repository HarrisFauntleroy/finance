/**
 *
 *	Auth page
 *	Checks if user is logged in before allowing access to page
 *
 */
import React, { useEffect, useMemo } from "react"

import { Button, Center, CircularProgress, useToast } from "@chakra-ui/react"
import { Role } from "database/generated/prisma-client"
import type { NextPageContext } from "next"
import { getSession, signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { defaultToast } from "~/utils/toast"

/** Loading component for the authorization flow */
function AuthLoading() {
	return (
		<Center
			position="fixed"
			minWidth="100vw"
			minHeight="100vh"
			background="transparent"
			top={0}
			left={0}
		>
			<CircularProgress isIndeterminate size="64px" thickness="8px" />
		</Center>
	)
}

enum Status {
	AUTHENTICATED = "authenticated",
	UNAUTHENTICATED = "unauthenticated",
	NO_ROLE = "role-not-found",
	LOADING = "loading",
}

type AuthProps = {
	children:
		| React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>
		| undefined
	// An array of roles from the current page
	roles?: Role[]
}

export const getServerSideProps = async (context: NextPageContext) => ({
	props: {
		session: await getSession(context),
	},
})

function Auth({ children, roles }: AuthProps) {
	const { data: session, status } = useSession({ required: true })

	const toast = useToast()

	const router = useRouter()

	const loading = status === Status.LOADING

	const role = useMemo(
		() => session?.user.role || Role.USER,
		[session?.user.role]
	)

	/** Prevent roles being undefined, as not every page should need to define roles */
	const rolesArray = useMemo(() => roles || [Role.USER], [roles])

	/** Is user role found in roles array  */
	const roleAllowed = useMemo(
		() => rolesArray.includes(role) || role === Role.ADMIN,
		[role, rolesArray]
	)

	/** Session found and not loading */
	const hasSession = !loading && session

	/** Session found and role allowed */
	const hasRequiredRole = hasSession && roleAllowed

	/** Authorized (Has session, role if required) */
	const authorized = useMemo(() => {
		/** Check role if one is provided */
		if (role) {
			/** Checks both session and role */
			return hasRequiredRole
		}

		/** Just checks session */
		return hasSession
	}, [role, hasSession, hasRequiredRole])

	/**
	 * Redirect anyone out of pages they shouldn't be in
	 */
	useEffect(() => {
		if (!(authorized || loading)) {
			router.push("/")
		}
	}, [authorized, loading, router])

	/** Loading state */
	if (loading) {
		return <AuthLoading />
	}

	if (!hasSession) {
		toast({
			title: (
				<Button
					onClick={
						session ? () => signOut({ callbackUrl: "/" }) : () => signIn()
					}
				>
					Please sign in to continue
				</Button>
			),
			status: "info",
			...defaultToast,
		})
	}

	/** Show content if auth checks pass */
	if (authorized && children) {
		return children
	}

	return null
	/** If all else fails return nothing */
}

export default Auth
