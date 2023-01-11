import React from "react"

import * as ChartJs from "chart.js"
import { Line } from "react-chartjs-2"
import { trpc } from "~/utils/trpc"

ChartJs.Chart.register(
	// Trendline first for z-axis
	// Trendline breaking with one days worth of data...
	// chartTrendline,
	ChartJs.CategoryScale,
	ChartJs.LinearScale,
	ChartJs.PointElement,
	ChartJs.LineElement,
	ChartJs.BarElement,
	ChartJs.ArcElement,
	ChartJs.Title,
	ChartJs.Tooltip,
	ChartJs.Legend,
	ChartJs.Filler
)

export const LogChart = () => {
	const { data } = trpc.logs.read.useQuery()

	return <>{data && <Line data={data} />}</>
}
