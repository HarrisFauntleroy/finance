import type { CSSProperties } from "react";
import React from "react";

import { Skeleton } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ChartScaffoldProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	series: any;
	options?: ApexCharts.ApexOptions;
	style?: CSSProperties;
	type:
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
		| "rangeBar";
}

const ChartScaffold = (props: ChartScaffoldProps) => {
	return (
		<Skeleton
			height="100%"
			width="100%"
			isLoaded={typeof window !== "undefined"}
		>
			<Chart height="100%" width="100%" {...props} />
		</Skeleton>
	);
};

export default ChartScaffold;
