import React from "react"

import { Page, Tabs } from "ui"
import { BudgetOverview } from "~/components/Budget/BudgetOverview"
import { BudgetPlanner } from "~/components/Budget/BudgetPlanner"
import { BudgetTransactions } from "~/components/Budget/BudgetTransactions"

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
