/**
 *
 *	Auth page
 *	Checks if user is logged in before allowing access to page
 *
 */
import React, { Fragment, type ReactNode } from "react"

import { Center, Progress, Stack, Text } from "@chakra-ui/react"
import { Role } from "database/generated/prisma-client"
import type { NextPageContext } from "next"
import { getSession, useSession } from "next-auth/react"

type AuthProps = {
	children?: ReactNode
	// An array of roles from the current page
	roles?: Role[]
}

export const getServerSideProps = async (context: NextPageContext) => {
	const session = await getSession(context)
	if (session) return { redirect: "/" }
}

function Auth({ children, roles }: AuthProps) {
	const { data: session, status } = useSession({
		required: true,
	})

	const loading = status === "loading"

	const role = session?.user.role || Role.USER
	const rolesArray = roles || [Role.USER]
	const roleAllowed = rolesArray.includes(role) || role === Role.ADMIN

	const hasSession = !loading && session
	// For a user to have a required role, they must have a session
	const hasRequiredRole = hasSession && roleAllowed
	// If role is required, user must have required role
	// Otherwise just a session is required
	const authorized = role ? hasRequiredRole : hasSession

	if (authorized && children) {
		return <Fragment>{children}</Fragment>
	}

	return (
		<Center height="100%">
			<Stack>
				<Text>Looking for sessions</Text>
				<Progress isIndeterminate />
			</Stack>
		</Center>
	)
}

export default Auth
