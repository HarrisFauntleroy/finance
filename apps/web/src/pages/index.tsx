/**
 *
 * Index page
 *
 */
import React, { useMemo } from "react"

import { Grid, GridItem, Stack, useColorModeValue } from "@chakra-ui/react"
import * as ChartJs from "chart.js"
import { RateType, calculateBurnDown } from "common"
import { Chart } from "react-chartjs-2"
import Card from "~/components/Cards"
import MdViewer from "~/components/Markdown/Editor"
import Page from "~/components/Page"
import { useMockData } from "~/hooks/useMockData"
import type { DefaultPage } from "~/pages/_app"

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

const Index: DefaultPage = () => {
	const burnRate = calculateBurnDown({
		startDate: new Date("2022-01-01"),
		endDate: new Date("2030-01-01"),
		startBalance: 25000,
		spendRate: 100,
		income: 5,
		rateType: RateType.DAILY,
	})

	const costBasisBg = useColorModeValue("#4299E1", "#0BC5EA")

	// const netWorthBg = useColorModeValue("#48BB78", "#805AD5")

	const data = useMemo(
		() => ({
			labels: burnRate.map(({ date }) => date.toLocaleString()),
			datasets: [
				{
					label: "Runway",
					data: burnRate.map(({ value }) => value),
					tension: 0.5,
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
			],
		}),
		[burnRate, costBasisBg]
	)

	const line = useMockData("line")
	const bar = useMockData("bar")
	const pie = useMockData("pie")

	return (
		<Page title="Home" gap="8px">
			<Stack alignItems="center" padding="16px">
				<Grid
					width="100%"
					templateAreas={{
						md: `"runway time"
         "expenses incomePie"`,
						sm: `"runway time"
         "expenses incomePie"`,
						base: `"runway"
           "time"
           "expenses"
           "incomePie"`,
					}}
					gridAutoFlow="dense"
					gridTemplateRows={"1fr 1fr"}
					gridTemplateColumns={{
						md: "1fr 1fr",
						sm: "1fr 1fr",
						base: "100vw",
					}}
					maxW="100%"
				>
					<GridItem minW="200px" area={"runway"}>
						<Card maxWidth="100%">
							You will run out of money in {burnRate.length} days
							<Chart
								type="line"
								data={data}
								options={{
									plugins: {
										legend: {
											display: false,
										},
										title: {
											display: true,
											text: "Burndown / Runway",
										},
									},
								}}
							/>
						</Card>
					</GridItem>

					<GridItem minW="200px" area={"time"}>
						<Card maxWidth="100%">
							<Chart
								type="line"
								options={{
									plugins: {
										legend: {
											display: false,
										},
										title: {
											display: true,
											text: "Income, Expenses, Net Worth over time",
										},
									},
								}}
								data={line}
							/>
						</Card>
					</GridItem>
					<GridItem minW="200px" area={"expenses"}>
						<Card maxWidth="100%">
							<Chart
								type="bar"
								options={{
									plugins: {
										legend: {
											display: false,
										},
										title: {
											display: true,
											text: "Expenses by Categories",
										},
									},
									scales: {
										x: {
											stacked: true,
										},
										y: {
											stacked: true,
										},
									},
								}}
								data={bar}
							/>
						</Card>
					</GridItem>
					<GridItem minW="200px" area={"incomePie"}>
						<Card maxWidth="100%">
							<Chart
								type="pie"
								options={{
									plugins: {
										legend: {
											display: false,
										},
										title: {
											display: true,
											position: "bottom",
											text: "Income distribution",
										},
									},
								}}
								data={pie}
							/>
						</Card>
					</GridItem>
				</Grid>
				<MdViewer />
			</Stack>
		</Page>
	)
}

Index.auth = false
export default Index
