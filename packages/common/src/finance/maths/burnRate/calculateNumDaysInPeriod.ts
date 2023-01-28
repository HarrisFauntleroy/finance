import { addMonths, differenceInCalendarDays } from "date-fns"

export enum RateType {
	DAILY,
	WEEKLY,
	FORTNIGHTLY,
	MONTHLY,
	QUARTERLY,
	BIANNUALLY,
	ANNUALLY,
}

export interface RateTypeParams {
	rateType: RateType
	periodLength: number
}

export function calculateNumDaysInPeriod({
	rateType,
	periodLength,
}: RateTypeParams): number {
	switch (rateType) {
		case RateType.DAILY:
			return periodLength * 1
		case RateType.WEEKLY:
			return periodLength * 7
		case RateType.FORTNIGHTLY:
			return periodLength * 14
		case RateType.MONTHLY:
			const startDate = new Date()
			const endDate = addMonths(startDate, periodLength)
			return differenceInCalendarDays(endDate, startDate)
		case RateType.QUARTERLY:
			return periodLength * 91.25
		case RateType.BIANNUALLY:
			return periodLength * 182.5
		case RateType.ANNUALLY:
			return periodLength * 365
		default:
			throw new Error(`Invalid rate type: ${rateType}`)
	}
}

export interface DateRange {
	startDate: Date
	endDate: Date
}

export interface CalculateNumParams extends DateRange {
	rateType: RateType
}

export function calculateNumPeriods({
	startDate,
	endDate,
	rateType,
}: CalculateNumParams): number {
	// Calculate the number of days between the startDate and endDate dates
	const numDays = Math.round(
		(endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
	)

	// Calculate the number of days in each period based on the rate type
	const periodLength = calculateNumDaysInPeriod({
		rateType,
		periodLength: numDays,
	})

	// Calculate the number of periods
	return Math.round(numDays / periodLength)
}
