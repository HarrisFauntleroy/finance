/**
 *
 * Markets page
 *
 */
import React from "react"

import { Cryptocurrency } from "~/components/Markets/Cryptocurrency"
import { Forex } from "~/components/Markets/Forex"
import Page from "~/components/Page"
import { Tabs } from "~/components/Tabs"
import type { DefaultPage } from "~/pages/_app"

const Markets: DefaultPage = () => {
	const tabData = [
		{
			title: "Cryptocurrency",
			page: <Cryptocurrency />,
		},
		{
			title: "Forex",
			page: <Forex />,
		},
	]

	return (
		<Page title="Markets">
			<Tabs pages={tabData} id="markets" />
		</Page>
	)
}

Markets.auth = true
export default Markets
