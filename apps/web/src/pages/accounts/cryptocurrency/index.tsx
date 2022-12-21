import React from "react"

import { GridItem } from "@chakra-ui/react"
import { AccountsList } from "~/components/Cryptocurrency/AccountsList"
import IncomeOverviewCard from "~/components/Cryptocurrency/Income"
import { Layout } from "~/components/Cryptocurrency/Layout"
import OverviewCard from "~/components/Cryptocurrency/Overview"
import { Targets } from "~/components/Cryptocurrency/Targets"

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
