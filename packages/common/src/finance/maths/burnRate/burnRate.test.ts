import { BurnRateParams, calculateBurnDown } from "./burnRate"
import { RateType } from "./calculateNumDaysInPeriod"

describe("calculateBurnDown", () => {
	it("should return the correct burn rate for a daily rate type", () => {
		const params: BurnRateParams = {
			startDate: new Date("2022-01-01"),
			endDate: new Date("2022-01-03"),
			startBalance: 100,
			spendRate: 10,
			income: 5,
			rateType: RateType.DAILY,
		}
		const expectedBurnRate = [
			{ date: new Date("2022-01-01"), value: 95 },
			{ date: new Date("2022-01-02"), value: 90 },
			{ date: new Date("2022-01-03"), value: 85 },
		]
		const result = calculateBurnDown(params)
		expect(result).toEqual(expectedBurnRate)
	})

	it("should run out of money at 0", () => {
		const params: BurnRateParams = {
			startDate: new Date("2022-01-01"),
			endDate: new Date("2022-01-03"),
			startBalance: 40,
			spendRate: 20,
			income: 10,
			rateType: RateType.DAILY,
		}
		const expectedBurnRate = [
			{ date: new Date("2022-01-01"), value: 30 },
			{ date: new Date("2022-01-02"), value: 20 },
			{ date: new Date("2022-01-03"), value: 10 },
		]
		const result = calculateBurnDown(params)
		console.log(result)
		expect(result).toEqual(expectedBurnRate)
	})
})
