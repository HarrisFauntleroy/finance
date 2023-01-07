/**
 *
 *	Auth page
 *	Checks if user is logged in before allowing access to page
 *
 */
import React, { Fragment, type ReactNode } from "react"

import { Center, Progress, Stack, Text } from "@chakra-ui/react"
import type { NextPageContext } from "next"
import { getSession, useSession } from "next-auth/react"

type AuthProps = {
	children?: ReactNode
}

export const getServerSideProps = async (context: NextPageContext) => {
	const session = await getSession(context)
	if (session) return { redirect: "/" }
}

function Auth({ children }: AuthProps) {
	const { data: session, status } = useSession({
		required: true,
	})

	const loading = status === "loading"

	const hasSession = !loading && session

	if (hasSession && children) {
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
