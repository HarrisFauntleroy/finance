import React, { useMemo } from "react"

import { useColorModeValue } from "@chakra-ui/react"
import { RateType, calculateBurnDown } from "common"
import { Chart } from "react-chartjs-2"
import { Card, Grid } from "ui"
import { useMockData } from "~/hooks/useMockData"

const Dashboard = () => {
	const costBasisBg = useColorModeValue("#4299E1", "#0BC5EA")

	const burnRate = calculateBurnDown({
		startDate: new Date("2022-01-01"),
		endDate: new Date("2030-01-01"),
		startBalance: 25000,
		spendRate: 100,
		income: 5,
		rateType: RateType.DAILY,
	})

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
		<Grid>
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
			<Card maxWidth="100%">
				{line && (
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
				)}
			</Card>
			<Card maxWidth="100%">
				{bar && (
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
				)}
			</Card>
			<Card maxWidth="100%">
				{pie && (
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
				)}
			</Card>
		</Grid>
	)
}

export default Dashboard
