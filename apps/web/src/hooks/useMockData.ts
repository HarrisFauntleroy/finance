import { faker } from "@faker-js/faker"
import type { ChartData } from "chart.js"

const mockLineChartData = () => {
	const labels = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
	]

	return {
		labels,
		datasets: [
			{
				label: "Dataset 1",
				data: labels.map(() =>
					faker.datatype.number({ min: -1000, max: 1000 })
				),
				borderColor: "rgb(255, 99, 132)",
				backgroundColor: "rgba(255, 99, 132, 0.5)",
			},
			{
				label: "Dataset 2",
				data: labels.map(() =>
					faker.datatype.number({ min: -1000, max: 1000 })
				),
				borderColor: "rgb(53, 162, 235)",
				backgroundColor: "rgba(53, 162, 235, 0.5)",
			},
		],
	}
}

const mockBarChartData = () => {
	const labels = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
	]

	return {
		labels,
		datasets: [
			{
				label: "Dataset 1",
				data: labels.map(() =>
					faker.datatype.number({ min: -1000, max: 1000 })
				),
				backgroundColor: "rgb(255, 99, 132)",
				stack: "Stack 0",
			},
			{
				label: "Dataset 2",
				data: labels.map(() =>
					faker.datatype.number({ min: -1000, max: 1000 })
				),
				backgroundColor: "rgb(75, 192, 192)",
				stack: "Stack 0",
			},
			{
				label: "Dataset 3",
				data: labels.map(() =>
					faker.datatype.number({ min: -1000, max: 1000 })
				),
				backgroundColor: "rgb(53, 162, 235)",
				stack: "Stack 1",
			},
		],
	}
}

const mockPieChartData = () => {
	const data: ChartData<"pie", number[], unknown> = {
		labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
		datasets: [
			{
				label: "# of Votes",
				data: [12, 19, 3, 5, 2, 3],
				backgroundColor: [
					"rgba(255, 99, 132, 0.2)",
					"rgba(54, 162, 235, 0.2)",
					"rgba(255, 206, 86, 0.2)",
					"rgba(75, 192, 192, 0.2)",
					"rgba(153, 102, 255, 0.2)",
					"rgba(255, 159, 64, 0.2)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)",
				],
				borderWidth: 1,
			},
		],
	}
	return data
}

export function useMockData(type: string) {
	switch (type) {
		case "line":
			return mockLineChartData() as any
		case "bar":
			return mockBarChartData() as any
		case "pie":
			return mockPieChartData() as any
	}
}
