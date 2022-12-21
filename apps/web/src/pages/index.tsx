/**
 *
 * Index page
 *
 */
import React, { useMemo } from "react"

import { Center, GridItem, Heading, useColorModeValue } from "@chakra-ui/react"
import * as ChartJs from "chart.js"
import { RateType, calculateBurnDown } from "common"
import Link from "next/link"
import { Bar, Line, Pie } from "react-chartjs-2"
import Card from "~/components/Cards"
import { Grid } from "~/components/Grid"
import Page from "~/components/Page"
import type { DefaultPage } from "~/pages/_app"
import { useMockData } from "~/hooks/useMockData"

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

const NavLink = ({ href }: { href: string }) => (
	<Link href={href} key={href}>
		<Card
			as="button"
			display="flex"
			justifyContent="center"
			alignItems="center"
			shadow="2xl"
			padding="16px"
		>
			<Heading size="md">{href.replace("/", "").toUpperCase()}</Heading>
		</Card>
	</Link>
)

const Index: DefaultPage = () => {
	const links = [
		{ href: "/accounts" },
		{ href: "/markets" },
		{ href: "/budgets" },
		{ href: "/profile" },
	]

	const burnRate = calculateBurnDown({
		startDate: new Date("2022-01-01"),
		endDate: new Date("2030-01-01"),
		startBalance: 25000,
		spendRate: 100,
		income: 5,
		rateType: RateType.DAILY,
	})

	const options = {
		responsive: true,
		type: "line",
		plugins: {
			legend: {
				position: "top" as const,
			},
			title: {
				display: true,
				text: "Burndown / Runway",
			},
		},
	}

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
		<Page title="Home" padding="16px" gap="8px">
			<Center alignItems="center">
				<Heading>Dashboard</Heading>
			</Center>
			<Grid columns={2}>{links.map(NavLink)}</Grid>
			<Grid
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
				gridTemplateRows={"1fr 1fr"}
				gridTemplateColumns={{
					md: "1fr 1fr",
					sm: "1fr 1fr",
					base: "100vw",
				}}
				maxW="100%"
			>
				<GridItem area={"runway"}>
					<Card>
						You will run out of money in {burnRate.length} days
						<Line data={data} options={options} />
					</Card>
				</GridItem>

				<GridItem area={"time"}>
					<Card>
						<Line
							options={{
								responsive: true,
								plugins: {
									legend: {
										position: "top" as const,
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
				<GridItem area={"expenses"}>
					<Card>
						<Bar
							options={{
								plugins: {
									title: {
										display: true,
										text: "Expenses by Categories",
									},
								},
								responsive: true,
								interaction: {
									mode: "index" as const,
									intersect: false,
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
				<GridItem area={"incomePie"}>
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
		</Page>
	)
}

Index.auth = false
export default Index
