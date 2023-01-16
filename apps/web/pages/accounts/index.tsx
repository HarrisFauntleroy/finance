/**
 *
 * Accounts page
 *
 */
import React from "react"

import { Page, Tabs } from "ui"
import AccountsPage from "~/pages/accounts/overview"

function Accounts() {
	const tabData = [
		{
			title: "Overview",
			page: <AccountsPage />,
		},
	]

	return (
		<Page title="Accounts">
			<Tabs pages={tabData} id="accounts" />
		</Page>
	)
}

Accounts.auth = true
export default Accounts
