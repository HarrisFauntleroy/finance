import React from "react"

import {
	Stack,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
} from "@chakra-ui/react"
import Link from "next/link"
import { Page } from "ui"
import { BudgetsList } from "~/components/Budget/Budgets"
import { BudgetOverview } from "~/components/Budget/Overview"
import { BudgetSettings } from "~/components/Budget/Settings"
import { BudgetTransactions } from "~/components/Portfolio/TransactionsList"

function Budgets() {
	return (
		<Page title="Budgets">
			<Stack height="100%">
				<Tabs variant="enclosed" height="100%" padding="8px">
					<TabList>
						<Tab>Overview</Tab>
						<Tab>Budgets</Tab>
						<Tab>Transactions</Tab>
						<Tab>Statistics</Tab>
					</TabList>
					<TabPanels height="100%">
						<TabPanel padding={0} height="100%">
							<Stack paddingY="8px">
								<BudgetOverview />
							</Stack>
						</TabPanel>
						<TabPanel padding={0} height="100%">
							<Stack paddingY="8px">
								<BudgetsList />
							</Stack>
						</TabPanel>
						<TabPanel padding={0} height="100%">
							<Stack paddingY="8px">
								<BudgetTransactions />
							</Stack>
						</TabPanel>
						<TabPanel padding={0} height="100%">
							<Stack paddingY="8px">
								<BudgetSettings />
							</Stack>
						</TabPanel>
					</TabPanels>
				</Tabs>
				<Text textAlign="center">
					Price data provided by{" "}
					<Link href="https://www.coingecko.com">CoinGecko</Link>
				</Text>
			</Stack>
		</Page>
	)
}

Budgets.auth = true
export default Budgets
