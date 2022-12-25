import { publicProcedure, router } from "../../trpc"
import type { ChartData } from "chart.js"
import { prisma } from "database"
import type { Log } from "database/generated/prisma-client"

/**
 * Routers: Log
 * @Queries
 * log.byId ✅
 * log.byUserId ✅
 * @Mutations
 * log.create ✅
 * log.update ✅
 * log.delete ✅
 */

export const logRouter = router({
	read: publicProcedure.query(async () => {
		const response = await prisma.log.findMany({
			orderBy: { createdAt: "desc" },
		})

		function getChartData(logs: Log[]): ChartData<"line", number[], string> {
			// Group the logs by date
			const logsByDate = logs.reduce((acc, log) => {
				// Extract the date from the createdAt property
				const date = log.createdAt.toString().slice(0, 10)
				// Initialize the logs for this date if it doesn't exist in the accumulator
				if (!acc[date]) {
					acc[date] = []
				}
				// Add the log to the logs for this date
				acc[date].push(log)
				return acc
			}, {} as { [key: string]: Log[] })

			// Get the dates in descending order (most recent first)
			const dates = Object.keys(logsByDate).sort((a, b) => b.localeCompare(a))
			// Initialize the labels and datasets arrays
			const labels: string[] = []
			const datasets: Array<{
				label: string
				data: number[]
				fill: boolean
			}> = []

			// Iterate over the dates
			for (const date of dates) {
				// Add the date to the labels array
				labels.push(date)

				// Initialize the data for each type of log
				const data: { [key: string]: number } = {}

				// Iterate over the logs for this date
				for (const log of logsByDate[date]) {
					// Initialize the count for this type if it doesn't exist
					if (!data[log.type]) {
						data[log.type] = 0
					}
					// Increment the count for this type
					data[log.type]++
				}

				// Iterate over the types of logs
				for (const type of Object.keys(data)) {
					// Check if there is already a dataset for this type
					let dataset = datasets.find((d) => d.label === type)
					if (!dataset) {
						// If not, create a new dataset for this type
						dataset = {
							label: type,
							data: [],
							fill: false,
						}
						// Add the dataset to the datasets array
						datasets.push(dataset)
					}
					// Add the count for this type and date to the data array of the dataset
					dataset.data.push(data[type])
				}
			}

			// Return the chart data object
			return {
				labels,
				datasets,
			}
		}

		// Get the counts of each error type for each day
		return getChartData(response || [])
	}),
})
