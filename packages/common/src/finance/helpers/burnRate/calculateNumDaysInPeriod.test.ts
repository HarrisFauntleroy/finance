import { RateType, calculateNumDaysInPeriod } from "./calculateNumDaysInPeriod"

describe("calculateNumDaysInPeriod", () => {
	it("should return the correct number of days for each rate type", () => {
		expect(
			calculateNumDaysInPeriod({ rateType: RateType.DAILY, periodLength: 1 })
		).toBe(1)

		expect(
			calculateNumDaysInPeriod({
				rateType: RateType.WEEKLY,
				periodLength: 1,
			})
		).toBe(7)

		expect(
			calculateNumDaysInPeriod({
				rateType: RateType.FORTNIGHTLY,
				periodLength: 1,
			})
		).toBe(14)

		expect(
			calculateNumDaysInPeriod({
				rateType: RateType.MONTHLY,
				periodLength: 3,
			})
		).toBe(90)

		expect(
			calculateNumDaysInPeriod({
				rateType: RateType.QUARTERLY,
				periodLength: 2,
			})
		).toBe(182.5)

		expect(
			calculateNumDaysInPeriod({
				rateType: RateType.BIANNUALLY,
				periodLength: 1,
			})
		).toBe(182.5)

		expect(
			calculateNumDaysInPeriod({
				rateType: RateType.ANNUALLY,
				periodLength: 1,
			})
		).toBe(365)
	})
})
