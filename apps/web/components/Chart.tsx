import { Skeleton } from "@chakra-ui/react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import type { CSSProperties } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type ChartScaffoldProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  series: any;
  options?: ApexOptions;
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
};

function ChartScaffold(props: ChartScaffoldProps) {
  return (
    <Skeleton
      height="100%"
      width="100%"
      isLoaded={typeof window !== "undefined"}
    >
      <Chart height="100%" width="100%" {...props} />
    </Skeleton>
  );
}

export default ChartScaffold;
