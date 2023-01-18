import React from "react"

import { Page, Tabs } from "ui"
import { BudgetOverview } from "~/components/Budget/Overview"
import { BudgetSettings } from "~/components/Budget/Settings"
import { BudgetsList } from "~/components/Budget/Transactions"

function Budgets() {
	const tabData = [
		{
			title: "Overview",
			page: <BudgetOverview />,
		},
		{
			title: "Budgets",
			page: <BudgetsList />,
		},
		{
			title: "Settings",
			page: <BudgetSettings />,
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
