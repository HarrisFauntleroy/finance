import type { CSSProperties } from "react"
import React from "react"

import { Skeleton } from "@chakra-ui/react"
import dynamic from "next/dynamic"

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

interface ChartScaffoldProps {
	options?: ApexCharts.ApexOptions
	series?: ApexAxisChartSeries | ApexNonAxisChartSeries
	style?: CSSProperties
	type?:
		| "area"
		| "line"
		| "bar"
		| "scatter"
		| "bubble"
		| "pie"
		| "polarArea"
		| "radar"
		| "histogram"
		| "donut"
		| "radialBar"
		| "heatmap"
		| "treemap"
		| "boxPlot"
		| "candlestick"
		| "rangeBar"
}

const ChartScaffold = ({
	options,
	series,
	style,
	type,
}: ChartScaffoldProps) => {
	return (
		<Skeleton
			height="100%"
			width="100%"
			isLoaded={typeof window !== "undefined"}
		>
			<Chart options={options} series={series} type={type} style={style} />
		</Skeleton>
	)
}

export default ChartScaffold
