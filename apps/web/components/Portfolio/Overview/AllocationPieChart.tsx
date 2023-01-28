import React from "react"

import { useSession } from "next-auth/react"
import { Card } from "ui"
import ChartScaffold from "~/components/Chart"
import { trpc } from "~/utils/trpc"

export const AllocationPieChart = () => {
	const session = useSession()
	const userId = session?.data?.userId

	const { data: allocationData } = trpc.accounts.allocation.useQuery({
		userId: userId || "",
	})

	const series = Object.values(allocationData || {})

	const options = {
		chart: {},
		labels: Object.keys(allocationData || {}),
		responsive: [
			{
				options: {
					chart: {},
					legend: {
						position: "bottom",
					},
				},
			},
		],
	}

	return (
		<Card>
			<ChartScaffold type="pie" series={series} options={options} />
		</Card>
	)
}
