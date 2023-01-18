import React from "react"

import { GridItem } from "@chakra-ui/react"

import { Layout } from "~/components/Portfolio/Layout"
import { NetWorthCostBasisChart } from "~/components/Portfolio/NetWorthCostBasisChart"
import { IncomeBreakdownTable } from "~/components/Portfolio/IncomeBreakdownTable"
import { AllocationPieChart } from "~/components/Portfolio/AllocationPieChart"
import { HistorySnapshots } from "~/components/Portfolio/HistorySnapshots"

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
