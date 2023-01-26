import React from "react"

import { GridItem } from "@chakra-ui/react"
import { HistorySnapshots } from "~/components/Portfolio/Hello/HistorySnapshots"
import { IncomeBreakdownTable } from "~/components/Portfolio/Hello/IncomeBreakdownTable"
import { Layout } from "~/components/Portfolio/Hello/Layout"
import { NetWorthCostBasisChart } from "~/components/Portfolio/Hello/NetWorthCostBasisChart"
import { AllocationPieChart } from "~/components/Portfolio/Overview/AllocationPieChart"

function AccountsPage() {
	return (
		<Layout>
			<GridItem area={"chart"}>
				<NetWorthCostBasisChart />
			</GridItem>

			<GridItem area={"allocation"}>
				<AllocationPieChart />
			</GridItem>

			<GridItem area={"history"}>
				<HistorySnapshots />
			</GridItem>

			<GridItem area={"income"}>
				<IncomeBreakdownTable />
			</GridItem>
		</Layout>
	)
}

AccountsPage.auth = true
export default AccountsPage
