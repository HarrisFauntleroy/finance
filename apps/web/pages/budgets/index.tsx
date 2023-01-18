import React from "react"

import { Page, Tabs } from "ui"
import { BudgetOverview } from "~/components/Budget/BudgetOverview"
import { BudgetSettings } from "~/components/Budget/BudgetSettings"
import { BudgetsList } from "~/components/Budget/BudgetsList"

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
