import React, { useMemo } from "react"

import {
	Table as ChakraTable,
	GridItem,
	Skeleton,
	Stat,
	TableContainer,
	Tbody,
	Td,
	Text,
	Tfoot,
	Th,
	Thead,
	Tr,
	useColorModeValue,
} from "@chakra-ui/react"
import type { ChartData } from "chart.js"
import * as ChartJs from "chart.js"
// import chartTrendline from "chartjs-plugin-trendline";
import currency from "currency.js"
import { format } from "date-fns"
import { useSession } from "next-auth/react"
import { Line, Pie } from "react-chartjs-2"
import { Layout } from "~/components/Accounts/Layout"
import OverviewCard from "~/components/Accounts/Overview"
import { historySnapshotColumns } from "~/components/Accounts/columns"
import { Card, Table } from "ui"
import { trpc } from "~/utils/trpc"

ChartJs.Chart.register(
	ChartJs.CategoryScale,
	ChartJs.LinearScale,
	ChartJs.PointElement,
	ChartJs.LineElement,
	ChartJs.ArcElement,
	ChartJs.BarElement,
	ChartJs.Title,
	ChartJs.Tooltip,
	ChartJs.Legend,
	ChartJs.Filler
)

export const options = {
	responsive: true,
	type: "line",
	plugins: {
		legend: {
			position: "top" as const,
		},
		title: {
			display: true,
			text: "Net Worth / Cost Basis",
		},
	},
	scales: {
		y: {
			min: 0,
			// stacked: true,
			ticks: {
				// Include a dollar sign in the ticks
				callback: (value: string | number) => {
					return currency(value).format()
				},
			},
		},
	},
}

function AccountsPage() {
	const session = useSession()
	const userId = session?.data?.userId

	const { data: accountsData } = trpc.accounts.byUserId.useQuery({
		userId: userId || "",
	})

	const { data: allocationData } = trpc.accounts.allocation.useQuery({
		userId: userId || "",
	})

	const { data: historyData } = trpc.accounts.historyByUserId.useQuery({
		userId: userId || "",
	})

	/** Show months and dates */
	const labels = historyData?.portfolioSnapshot.map(({ createdAt }) =>
		format(new Date(createdAt), "dd MMM")
	)

	/** Make a copy of the data to allow mutation/reversal */
	const tableData =
		historyData?.portfolioSnapshot && Array.from(historyData?.portfolioSnapshot)

	const costBasisBg = useColorModeValue("#4299E1", "#0BC5EA")

	const netWorthBg = useColorModeValue("#48BB78", "#805AD5")

	const lineData = useMemo(
		() => ({
			labels,
			datasets: [
				{
					label: "Cost Basis",
					data: historyData?.portfolioSnapshot.map(
						({ costBasis }) => costBasis
					),
					tension: 0.4,
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
				{
					label: "Net Worth",
					data: historyData?.portfolioSnapshot.map(
						({ totalValue }) => totalValue
					),
					tension: 0.4,
					spanGaps: true,
					borderColor: netWorthBg,
					trendlineLinear: {
						colorMin: netWorthBg,
						colorMax: "red",
						style: "solid",
						lineStyle: "solid" as const,
						width: 2,
					},
				},
			],
		}),
		[costBasisBg, historyData?.portfolioSnapshot, labels, netWorthBg]
	)

	const IncomeBreakdown = () => (
		<Card>
			<Text
				variant="h3"
				fontSize={{ base: "lg", sm: "2xl" }}
				fontWeight="bold"
				lineHeight="1.2"
			>
				Income Breakdown
			</Text>
			<TableContainer>
				<ChakraTable variant="simple" size="sm">
					<Thead>
						<Tr>
							<Th />
							<Th textAlign="right">Daily</Th>
							<Th textAlign="right">Weekly</Th>
							<Th textAlign="right">Monthly</Th>
							<Th textAlign="right">Annually</Th>
						</Tr>
					</Thead>
					<Tbody>
						<Tr>
							<Th>Staking</Th>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
						</Tr>
						<Tr>
							<Th>Rent</Th>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
						</Tr>
						<Tr>
							<Th>Dividends</Th>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
						</Tr>
						<Tr>
							<Th>Distributions</Th>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
						</Tr>
						<Tr>
							<Th>Mining</Th>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
						</Tr>
						<Tr>
							<Th>Lending</Th>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
						</Tr>
						<Tr>
							<Th>Interest</Th>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
						</Tr>
					</Tbody>
					<Tfoot>
						<Tr>
							<Th>Total</Th>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
						</Tr>
					</Tfoot>
				</ChakraTable>
			</TableContainer>
		</Card>
	)

	const data: ChartData<"pie", number[], unknown> = useMemo(
		() => ({
			labels: allocationData?.map(({ name }) => name),
			datasets: [
				{
					label: "# of Votes",
					data: allocationData?.map(({ value }) => value) || [],
					backgroundColor: [
						"rgba(54, 162, 235, 0.2)",
						"rgba(255, 99, 132, 0.2)",
						"rgba(255, 206, 86, 0.2)",
						"rgba(75, 192, 192, 0.2)",
						"rgba(153, 102, 255, 0.2)",
						"rgba(255, 159, 64, 0.2)",
					],
					borderColor: [
						"rgba(54, 162, 235, 1)",
						"rgba(255, 99, 132, 1)",
						"rgba(255, 206, 86, 1)",
						"rgba(75, 192, 192, 1)",
						"rgba(153, 102, 255, 1)",
						"rgba(255, 159, 64, 1)",
					],
				},
			],
		}),
		[allocationData]
	)

	return (
		<Layout>
			<GridItem area={"overview"}>
				<OverviewCard data={accountsData} />
			</GridItem>

			<GridItem area={"chart"}>
				<Card>
					<Line options={options} data={lineData} />
				</Card>
			</GridItem>

			<GridItem area={"allocation"}>
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
									display: true,
									position: "right",
								},
								title: {
									display: true,
									position: "top",
									// align: "start",
									text: "Portfolio Allocation",
								},
							},
						}}
						data={data}
					/>
				</Card>
			</GridItem>

			<GridItem area={"history"}>
				<Card>
					<Text
						variant="h3"
						fontSize={{ base: "lg", sm: "2xl" }}
						fontWeight="bold"
						lineHeight="1.2"
					>
						History Snapshots
					</Text>
					<Skeleton rounded="xl" isLoaded={!!tableData}>
						<Table
							pageSize={4}
							columns={historySnapshotColumns}
							id={"history-portfolioSnapshot"}
							// ISO8601See General principles was designed for lexicographical sort. As such the ISO8601 string representation can be sorted like any other string, and this will give the expected order
							// https://stackoverflow.com/questions/12192491/sort-array-by-iso-8601-date
							// This only works if the date includes the timezone
							data={
								tableData
									?.sort(function (a, b) {
										return a.createdAt < b.createdAt
											? -1
											: a.createdAt > b.createdAt
											? 1
											: 0
									})
									.reverse() || []
							}
						/>
					</Skeleton>
				</Card>
			</GridItem>

			<GridItem area={"income"}>
				<IncomeBreakdown />
			</GridItem>
		</Layout>
	)
}

export default AccountsPage
