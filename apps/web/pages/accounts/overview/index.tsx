import React from "react"

import { GridItem } from "@chakra-ui/react"
import * as ChartJs from "chart.js"
import currency from "currency.js"
import { Layout } from "~/components/Portfolio/Layout"
import { NetWorthCostBasisChart } from "~/components/Portfolio/NetWorthCostBasisChart"
import { IncomeBreakdownTable } from "~/components/Portfolio/IncomeBreakdownTable"
import { AllocationPieChart } from "~/components/Portfolio/AllocationPieChart"
import { HistorySnapshots } from "~/components/Portfolio/HistorySnapshots"

ChartJs.Chart.register(
	ChartJs.CategoryScale,
	ChartJs.LinearScale,
	ChartJs.PointElement,
	ChartJs.LineElement,
	ChartJs.ArcElement,
	ChartJs.BarElement,
	ChartJs.Title,
	ChartJs.Tooltip,
	ChartJs.Legend,
	ChartJs.Filler
)

export const options = {
	responsive: true,
	type: "line",
	plugins: {
		legend: {
			position: "top" as const,
		},
		title: {
			display: true,
			text: "Net Worth / Cost Basis",
		},
	},
	scales: {
		y: {
			min: 0,
			// stacked: true,
			ticks: {
				// Include a dollar sign in the ticks
				callback: (value: string | number) => {
					return currency(value).format()
				},
			},
		},
	},
}

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
