import React from "react"

import {
	Stack,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from "@chakra-ui/react"
import { Page } from "ui"
import { BudgetsList } from "~/components/Budget/BudgetsList"
import { BudgetOverview } from "~/components/Budget/Overview"
import { Statistics } from "~/components/Budget/Statistics"
import { BudgetTransactions } from "~/components/Budget/TransactionsList"

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
								<Statistics />
							</Stack>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Stack>
		</Page>
	)
}

Budgets.auth = true
export default Budgets
