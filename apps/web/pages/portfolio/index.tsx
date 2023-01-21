import React from "react"

import Accounts from "./accounts"
import Overview from "./overview"
import Statistics from "./statistics"
import Transactions from "./transactions"
import {
	Stack,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from "@chakra-ui/react"

const Portfolio = () => {
	return (
		<Stack height="100%">
			<Tabs variant="enclosed" height="100%" padding="8px">
				<TabList>
					<Tab>Overview</Tab>
					<Tab>Accounts</Tab>
					<Tab>Transactions</Tab>
					<Tab>Statistics</Tab>
				</TabList>
				<TabPanels height="100%">
					<TabPanel padding={0} height="100%">
						<Overview />
					</TabPanel>
					<TabPanel padding={0} height="100%">
						<Accounts />
					</TabPanel>
					<TabPanel padding={0} height="100%">
						<Transactions />
					</TabPanel>
					<TabPanel padding={0} height="100%">
						<Statistics />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Stack>
	)
}

Portfolio.auth = true
export default Portfolio
