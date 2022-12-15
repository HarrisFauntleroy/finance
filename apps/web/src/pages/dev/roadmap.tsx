/**
 *
 * Roadmap page
 *
 */
import React from "react"

import type { Milestone } from "~/components/Cards/Milestones"
import Milestones from "~/components/Cards/Milestones"
import Page from "~/components/Page"
import { Body } from "~/components/Page/Body"
import type { DefaultPage } from "~/pages/_app"

const Roadmap: DefaultPage = () => {
	const milestones: Milestone[] = [
		{
			id: 1,
			date: "August 3rd, 2022",
			title: "Version 1.0.0",
			description: "Foundational release.",
		},
		{
			id: 2,
			date: "TBA",
			title: "Version 1.1.0",
			description:
				"Baseline support for Cryptocurrency integration. Supporting Bitcoin (BTC), Ethereum (ETH), Cosmos (ATOM) & ERGO. Adding a wallet address will update with latest balances",
		},
		{
			id: 3,
			date: "TBA",
			title: "Version 1.2.0",
			description:
				"Crypto exchange integration with first candidates as Coinspot, Swyftx, Coinbase and Binance",
		},
		{
			id: 4,
			date: "TBA",
			title: "Version 1.3.0",
			description:
				"Support for selected Cryptocurrencies to fetch associated token balances, either using a contract address or automatically.",
		},
		{
			id: 5,
			date: "TBA",
			title: "Version 1.4.0",
			description:
				"Support for traditional markets ie. Stocks, ETF's, Managed Funds, Precious metals, property etc.",
		},
		{
			id: 6,
			date: "TBA",
			title: "Version 1.5.0",
			description: "First implementation of Budgets",
		},
	]

	return (
		<Page title="Roadmap">
			<Body>
				<Milestones milestones={milestones} />
			</Body>
		</Page>
	)
}

Roadmap.auth = false
export default Roadmap
