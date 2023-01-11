/**
 *
 * Markets page
 *
 */
import React from "react"

import { Page, Tabs } from "ui"
import { Cryptocurrency } from "~/components/Markets/Cryptocurrency"
import { Forex } from "~/components/Markets/Forex"
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
		{
			title: "Compare",
			page: <Forex />,
		},
		{
			title: "Insights",
			page: <Forex />,
		},
	]

	return (
		<Page title="Markets">
			<Tabs pages={tabData} id="markets" />
		</Page>
	)
}

Markets.auth = false
export default Markets
