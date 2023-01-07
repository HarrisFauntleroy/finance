import { logger } from "common"
import Papa from "papaparse"

// Load the CSV file and parse its contents
export async function loadCSV(file: File): Promise<unknown[]> {
	return new Promise((resolve, reject) =>
		Papa.parse(file, {
			header: true,
			dynamicTyping: true,
			complete: (results) => {
				logger.info("Loaded CSV", results.data)
				resolve(results.data)
			},
			error: (error) => {
				logger.error(error.message)
				reject(error)
			},
		})
	)
}
