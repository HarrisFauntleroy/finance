import React, { useMemo } from "react"

import type { ChartData } from "chart.js"
import { useSession } from "next-auth/react"
import { Pie } from "react-chartjs-2"
import { Card } from "ui"
import { trpc } from "~/utils/trpc"

export const AllocationPieChart = () => {
	const session = useSession()
	const userId = session?.data?.userId

	const { data: allocationData } = trpc.accounts.allocation.useQuery({
		userId: userId || "",
	})

	const data: ChartData<"pie", number[], unknown> = useMemo(
		() => ({
			labels: allocationData?.map(({ name }) => name),
			datasets: [
				{
					label: "# of Votes",
					data: allocationData?.map(({ value }) => value) || [],
					backgroundColor: [
						"rgba(54, 162, 235, 0.2)",
						"rgba(255, 99, 132, 0.2)",
						"rgba(255, 206, 86, 0.2)",
						"rgba(75, 192, 192, 0.2)",
						"rgba(153, 102, 255, 0.2)",
						"rgba(255, 159, 64, 0.2)",
					],
					borderColor: [
						"rgba(54, 162, 235, 1)",
						"rgba(255, 99, 132, 1)",
						"rgba(255, 206, 86, 1)",
						"rgba(75, 192, 192, 1)",
						"rgba(153, 102, 255, 1)",
						"rgba(255, 159, 64, 1)",
					],
				},
			],
		}),
		[allocationData]
	)

	return (
		<Card>
			<Pie
				style={{
					maxHeight: "100%",
					maxWidth: "100%",
					aspectRatio: "1/1",
				}}
				options={{
					maintainAspectRatio: false,
					responsive: true,
					plugins: {
						legend: {
							display: true,
							position: "right",
						},
						title: {
							display: true,
							position: "top",
							// align: "start",
							text: "Portfolio Allocation",
						},
					},
				}}
				data={data}
			/>
		</Card>
	)
}
