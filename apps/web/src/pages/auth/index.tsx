/**
 *
 *	Auth page
 *	Checks if user is logged in before allowing access to page
 *
 */
import type { ReactNode } from "react"
import { Fragment } from "react"
import React, { useEffect } from "react"

import {
	Button,
	Center,
	Progress,
	Stack,
	Text,
	useToast,
} from "@chakra-ui/react"
import { Role } from "database/generated/prisma-client"
import type { NextPageContext } from "next"
import { getSession, signIn, useSession } from "next-auth/react"
import { useRouter } from "next/router"

type AuthProps = {
	children?: ReactNode
	// An array of roles from the current page
	roles?: Role[]
}

export const getServerSideProps = async (context: NextPageContext) => ({
	props: {
		session: await getSession(context),
	},
})

const SignInButton = () => (
	<Button variant="link" onClick={() => signIn()} textDecoration="underline">
		Please sign in to continue
	</Button>
)

function Auth({ children, roles }: AuthProps) {
	const toast = useToast()
	const router = useRouter()
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

	useEffect(() => {
		const id = "authentication-toast"
		const showToast = () => {
			if (!toast.isActive(id))
				toast({
					id,
					title: "Session not found",
					description: <SignInButton />,
					status: "warning",
					duration: null,
					position: "bottom",
					variant: "subtle",
				})
		}

		if (!authorized) {
			if (!hasSession) {
				showToast()
			} else {
				router.push("/")
			}
		}
	}, [authorized, hasSession, router, toast])

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
