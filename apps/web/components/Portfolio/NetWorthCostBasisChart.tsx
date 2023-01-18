import React, { useMemo } from "react"

import { Card, useColorModeValue } from "@chakra-ui/react"
import { format } from "date-fns"
import { useSession } from "next-auth/react"
import { Line } from "react-chartjs-2"
import { options } from "~/pages/portfolio/overview"
import { trpc } from "~/utils/trpc"

export const NetWorthCostBasisChart = () => {
	const session = useSession()
	const userId = session?.data?.userId

	const { data } = trpc.accounts.historyByUserId.useQuery({
		userId: userId || "",
	})

	/** Show months and dates */
	const labels = data?.portfolioSnapshot.map(({ createdAt }) =>
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
