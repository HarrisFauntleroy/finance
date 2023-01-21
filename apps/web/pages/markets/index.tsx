/**
 *
 * Markets page
 *
 */
import React from "react"

import CryptoComparison from "../../components/Markets/CryptoComparison"
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { Cryptocurrency } from "~/components/Markets/Cryptocurrency"
import { Forex } from "~/components/Markets/Forex"

const Markets = () => {
	return (
		<Tabs variant="enclosed" height="100%" padding="8px">
			<TabList>
				<Tab>Cryptocurrency</Tab>
				<Tab>Forex</Tab>
				<Tab>Compare</Tab>
			</TabList>
			<TabPanels height="100%">
				<TabPanel padding={0} height="100%">
					<Cryptocurrency />
				</TabPanel>
				<TabPanel padding={0} height="100%">
					<Forex />
				</TabPanel>
				<TabPanel padding={0} height="100%">
					<CryptoComparison />
				</TabPanel>
			</TabPanels>
		</Tabs>
	)
}

Markets.auth = false
export default Markets
