/**
 *
 * Index page
 *
 */
import type { ChangeEvent } from "react"
import React, { useMemo } from "react"
import {
	Button,
	Grid,
	GridItem,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react"
import * as ChartJs from "chart.js"
import { RateType, calculateBurnDown, logger } from "common"
import { Chart } from "react-chartjs-2"
import { Card, Page } from "ui"
import { useMockData } from "~/hooks/useMockData"
import type { DefaultPage } from "~/pages/_app"
import { loadCSV } from "~/components/Csv"

ChartJs.Chart.register(
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

	// Timestamp	Description	Currency	Amount	To Currency	To Amount	baseCurrency	baseAmount	Native Amount (USD)	TxType	TxHash
	const [csvState, setCsvState] = React.useState<unknown[]>()

	function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
		const target = event.target as HTMLInputElement
		const files = target.files
		const file = files?.[0]
		if (file) {
			loadCSV(file).then((parsedData) => {
				setCsvState(parsedData)
			})
		}
		logger.error("File not found")
		return { error: "File not found" }
	}

	const { onClose } = useDisclosure()

	const headers = Object.keys((csvState?.[0] as Record<string, unknown>) || {})

	return (
		<Page title="Home" gap="8px">
			<Stack alignItems="center" padding="16px">
				<div>
					<input type="file" onChange={handleFileChange} />
					<Modal isOpen={!!csvState?.length} onClose={onClose} size="2xl">
						<ModalOverlay />
						<ModalContent>
							<ModalHeader>Modal Title</ModalHeader>
							<ModalCloseButton />
							<ModalBody overflow="scroll">
								<form
								// onSubmit={handleSubmit}
								>
									<Table id="table" size="sm" variant="striped" maxWidth="100%">
										<Thead>
											<Tr>
												{headers?.map((header: string) => (
													<Th key={header}>
														<input
															type="text"
															value={header}
															// onChange={(e) => handleHeaderChange(e, index)}
														/>
													</Th>
												))}
											</Tr>
										</Thead>
										<Tbody>
											{csvState?.map((cell) => (
												<Tr key={String(cell)}>
													{Object.values(cell as Record<string, string>).map(
														(value: string) => (
															<Td key={value}>
																<input
																	type="text"
																	value={value}
																	// onChange={(e) =>
																	// 	handleCellChange(e, rowIndex, cellIndex)
																	// }
																/>
															</Td>
														)
													)}
												</Tr>
											))}
										</Tbody>
									</Table>
									<button type="submit">Submit</button>
								</form>
							</ModalBody>
							<ModalFooter>
								<Button colorScheme="blue" mr={3} onClick={onClose}>
									Close
								</Button>
								<Button variant="ghost">Secondary Action</Button>
							</ModalFooter>
						</ModalContent>
					</Modal>
				</div>
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
					</GridItem>
					<GridItem minW="200px" area={"expenses"}>
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
					</GridItem>
					<GridItem minW="200px" area={"incomePie"}>
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
					</GridItem>
				</Grid>
			</Stack>
		</Page>
	)
}

Index.auth = false
export default Index
