/**
 *
 * Index page
 *
 */
import React, { useMemo } from "react"

import { Center, Heading, useColorModeValue } from "@chakra-ui/react"
import * as ChartJs from "chart.js"
import { RateType, calculateBurnDown } from "common"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { Line } from "react-chartjs-2"
import Card from "~/components/Cards"
import { Grid } from "~/components/Grid"
import Page from "~/components/Page"
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
	const session = useSession()
	const userName = session.data?.user?.name

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

	return (
		<Page title="Home">
			<Center alignItems="center" padding="16px">
				<Heading>Welcome {userName}!</Heading>
			</Center>
			You will run out of money in {burnRate.length} days
			<Line data={data} options={options} />
			<Grid columns={2} padding="16px">
				{links.map(NavLink)}
			</Grid>
		</Page>
	)
}

Index.auth = false
export default Index
