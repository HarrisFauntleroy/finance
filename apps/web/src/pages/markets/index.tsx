/**
 *
 * Markets page
 *
 */
import React from "react"

import { Page } from "ui"
import { Tabs } from "ui"
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
	]

	return (
		<Page title="Markets">
			<Tabs pages={tabData} id="markets" />
		</Page>
	)
}

Markets.auth = true
export default Markets
