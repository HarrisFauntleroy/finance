import React from "react"

import { BudgetOverview } from "~/components/Budget/BudgetOverview"
import { BudgetPlanner } from "~/components/Budget/BudgetPlanner"
import { BudgetTransactions } from "~/components/Budget/BudgetTransactions"
import { Tabs, Page } from "ui"

function Budgets() {
	const tabData = [
		{
			title: "Overview",
			page: <BudgetOverview />,
		},
		{
			title: "Transactions",
			page: <BudgetTransactions />,
		},
		{
			title: "Planner",
			page: <BudgetPlanner />,
		},
	]

	return (
		<Page title="Budgets">
			<Tabs pages={tabData} id="budgets" />
		</Page>
	)
}

Budgets.auth = true
export default Budgets
