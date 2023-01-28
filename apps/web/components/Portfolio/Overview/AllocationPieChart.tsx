import React from "react"

import { logger } from "common"
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

	logger.info(allocationData)

	const options = {
		chart: {
			width: 380,
		},
		labels: Object.keys(allocationData || {}),
		responsive: [
			{
				breakpoint: 480,
				options: {
					chart: {
						width: 200,
					},
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
