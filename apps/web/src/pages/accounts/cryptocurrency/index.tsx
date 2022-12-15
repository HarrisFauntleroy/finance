import React from "react"

import { GridItem } from "@chakra-ui/react"
import { AccountsList } from "~/components/Accounts/Cryptocurrency/AccountsList"
import IncomeOverviewCard from "~/components/Accounts/Cryptocurrency/Income"
import { Layout } from "~/components/Accounts/Cryptocurrency/Layout"
import OverviewCard from "~/components/Accounts/Cryptocurrency/Overview"
import { Targets } from "~/components/Accounts/Cryptocurrency/Targets"

function CryptoPage() {
	return (
		<Layout>
			<GridItem area={"overview"}>
				<OverviewCard />
			</GridItem>
			<GridItem area={"income"}>
				<IncomeOverviewCard />
			</GridItem>
			<GridItem area={"assets"}>
				<AccountsList />
			</GridItem>
			<GridItem area={"targets"}>
				<Targets />
			</GridItem>
		</Layout>
	)
}

export default CryptoPage
