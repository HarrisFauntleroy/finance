import React from "react"

import AccountsPage from "../../components/Portfolio/Hello"
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
import { Page } from "ui"

const Portfolio = () => {
	return (
		<Page title="Portfolio">
			<Stack height="100%">
				<Tabs height="100%" padding="8px">
					<TabList>
						<Tab>Overview</Tab>
						<Tab>Accounts</Tab>
						<Tab>Transactions</Tab>
						<Tab>Statistics</Tab>
						<Tab>Hello</Tab>
					</TabList>
					<TabPanels height="100%" padding="8px">
						<TabPanel padding={0} height="100%">
							<Stack paddingY="8px">
								<Overview />
							</Stack>
						</TabPanel>
						<TabPanel padding={0} height="100%">
							<Stack paddingY="8px">
								<Accounts />
							</Stack>
						</TabPanel>
						<TabPanel padding={0} height="100%">
							<Stack paddingY="8px">
								<Transactions />
							</Stack>
						</TabPanel>
						<TabPanel padding={0} height="100%">
							<Stack paddingY="8px">
								<Statistics />
							</Stack>
						</TabPanel>
						<TabPanel>
							<AccountsPage />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Stack>
		</Page>
	)
}

Portfolio.auth = true
export default Portfolio
