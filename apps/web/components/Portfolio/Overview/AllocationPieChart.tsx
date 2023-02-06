import React, { useMemo } from "react"

import currency from "currency.js"
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

	const options = useMemo(
		() => ({
			chart: {
				type: "pie" as const,
			},
			labels: Object.keys(allocationData || {}),
			legend: {
				enabled: true,
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				formatter: function (_val: any, opt: any) {
					return (
						opt.w.globals.labels[opt.seriesIndex].slice(0, 6) +
						":  " +
						currency(opt.w.globals.series[opt.seriesIndex]).format()
					)
				},
			},
			dataLabels: {
				enabled: true,
			},
		}),
		[allocationData]
	)

	return (
		<Card>
			<ChartScaffold type="pie" series={series} options={options} />
		</Card>
	)
}
