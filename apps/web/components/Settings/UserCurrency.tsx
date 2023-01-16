import React from "react"

import { useSession } from "next-auth/react"
import NextError from "next/error"
import { trpc } from "~/utils/trpc"

export const UserCurrency = () => {
	const { data: session } = useSession()
	const userId = session?.userId || ""

	/** Fetch list of assets for form autocomplete */
	const { data, error, status } = trpc.settings.byUserId.useQuery({ userId })

	if (error) {
		return (
			<NextError
				title={error.message}
				statusCode={error.data?.httpStatus ?? 500}
			/>
		)
	}

	if (!session) {
		return <>Not signed in...</>
	}

	if (status !== "success") {
		return <>Loading...</>
	}

	return <div>{data?.userCurrency?.toUpperCase()}</div>
}
