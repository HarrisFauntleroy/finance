/**
 *
 * Profile page
 *
 */
import React from "react"

import { useSession } from "next-auth/react"
import Page from "~/components/Page"
import { Body } from "~/components/Page/Body"
import { SettingsForm } from "~/components/Settings/Form"
import type { DefaultPage } from "~/pages/_app"
import { trpc } from "~/utils/trpc"

const Profile: DefaultPage = () => {
	/** Session from next-auth */
	const session = useSession()
	/** userId */
	const userId = session.data?.userId

	const { data: defaultValues } = trpc.settings.byUserId.useQuery(

		{ userId: userId || "" })

	return (
		<Page title="Profile">
			<Body>
				<SettingsForm defaultValues={defaultValues} />
			</Body>
		</Page>
	)
}

Profile.auth = true
export default Profile
