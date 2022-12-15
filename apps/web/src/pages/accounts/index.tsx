/**
 *
 * Accounts page
 *
 */
import React from "react"

import { Text } from "@chakra-ui/react"
import Link from "next/link"
import Page from "~/components/Page"
import { Tabs } from "~/components/Tabs"
import CryptoPage from "~/pages/accounts/cryptocurrency"
import AccountsPage from "~/pages/accounts/overview"

function Accounts() {
	const tabData = [
		{
			title: "Overview",
			page: <AccountsPage />,
		},
		{
			title: "Cryptocurrency",
			page: <CryptoPage />,
		},
	]

	return (
		<Page title="Accounts">
			<Tabs pages={tabData} id="accounts" />
			<Text textAlign="center">
				Price data provided by{" "}
				<Link href="https://www.coingecko.com">CoinGecko</Link>
			</Text>
		</Page>
	)
}

Accounts.auth = true
export default Accounts
