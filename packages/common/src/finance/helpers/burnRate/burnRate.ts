import { addDays, differenceInDays } from "date-fns"
import {
	calculateNumDaysInPeriod,
	calculateNumPeriods,
	DateRange,
	RateType,
} from "./calculateNumDaysInPeriod"

export interface BurnRateParams extends DateRange {
	startBalance: number
	targetBalance?: number
	spendRate: number
	income: number
	rateType: RateType
}

export type BurnDown = { date: Date; value: number }

export function calculateBurnDown(params: BurnRateParams): BurnDown[] {
	const { startBalance, spendRate, income, rateType, targetBalance } = params

	const numDays = differenceInDays(params.endDate, params.startDate) + 1
	const numPeriods = calculateNumPeriods(params)
	const numDaysInPeriod = calculateNumDaysInPeriod({
		rateType,
		periodLength: numPeriods,
	})
	const burnRate: BurnDown[] = []

	let balance = startBalance
	for (let i = 0; i < numDays; i++) {
		const date = addDays(params.startDate, i * numDaysInPeriod)

		balance = balance - spendRate * numDaysInPeriod + income * numDaysInPeriod
		if (balance <= 0) {
			break
		}
		burnRate.push({ date, value: balance })
	}
	return burnRate
}
