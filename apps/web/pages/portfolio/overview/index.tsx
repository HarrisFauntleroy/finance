import React from "react"

import { GridItem } from "@chakra-ui/react"
import * as ChartJs from "chart.js"
import currency from "currency.js"
import { Layout } from "~/components/Cryptocurrency/Layout"
import { AllocationPieChart } from "~/components/Portfolio/Overview/AllocationPieChart"
import { HistorySnapshots } from "~/components/Portfolio/Overview/HistorySnapshots"
import { NetWorthCostBasisChart } from "~/components/Portfolio/Overview/NetWorthCostBasisChart"
import { OverviewAccountsList } from "~/components/Portfolio/Overview/OverviewAccountsList"
import OverviewCard from "~/components/Portfolio/Overview/OverviewCard"

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

function Overview() {
	return (
		<Layout>
			<GridItem area={"overview"}>
				<OverviewCard />
			</GridItem>
			<GridItem area={"allocation"}>
				<AllocationPieChart />
			</GridItem>
			<GridItem area={"chart"}>
				<NetWorthCostBasisChart />
			</GridItem>
			<GridItem area={"assets"}>
				<OverviewAccountsList />
			</GridItem>
			<GridItem area={"history"}>
				<HistorySnapshots />
			</GridItem>
		</Layout>
	)
}

Overview.auth = true
export default Overview
