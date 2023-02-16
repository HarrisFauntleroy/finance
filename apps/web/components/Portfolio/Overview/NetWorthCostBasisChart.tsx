import React, { useMemo } from "react"

import { Card, useColorModeValue } from "@chakra-ui/react"
import currency from "currency.js"
import { format } from "date-fns"
import { useSession } from "next-auth/react"
import { Line } from "react-chartjs-2"
import { trpc } from "~/utils/trpc"

const options = {
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

export const NetWorthCostBasisChart = () => {
	const session = useSession()
	const userId = session?.data?.userId

	const { data } = trpc.assets.historyByUserId.useQuery({
		userId: userId || "",
	})

	const labels = data?.portfolioSnapshot?.map(({ createdAt }) =>
		format(new Date(createdAt), "dd MMM")
	)

	const costBasisBg = useColorModeValue("#4299E1", "#0BC5EA")
	const netWorthBg = useColorModeValue("#48BB78", "#805AD5")

	const lineData = useMemo(
		() => ({
			labels,
			datasets: [
				{
					label: "Cost Basis",
					data: data?.portfolioSnapshot.map(({ costBasis }) => costBasis),
					tension: 0.4,
					spanGaps: true,
					borderColor: costBasisBg,
					borderDash: [8, 4],
					trendlineLinear: {
						colorMin: "red",
						colorMax: costBasisBg,
						style: "solid",
						lineStyle: "solid" as const,
						width: 2,
					},
				},
				{
					label: "Net Worth",
					data: data?.portfolioSnapshot.map(({ totalValue }) => totalValue),
					tension: 0.4,
					spanGaps: true,
					borderColor: netWorthBg,
					trendlineLinear: {
						colorMin: netWorthBg,
						colorMax: "red",
						style: "solid",
						lineStyle: "solid" as const,
						width: 2,
					},
				},
			],
		}),
		[costBasisBg, data?.portfolioSnapshot, labels, netWorthBg]
	)

	return (
		<Card>
			<Line options={options} data={lineData} />
		</Card>
	)
}