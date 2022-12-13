import { percentageDifference } from "./percentageDifference"

test("Percentage difference shows the percent difference when compared to the average of two numbers", () => {
	// Should return a 100% increase
	expect(percentageDifference(10, 30)).toEqual(100)

	// Should return a 66% decrease
	expect(percentageDifference(2, 1)).toEqual(-66.66666666666666)

	// Should return a 24.45% decrease
	expect(Number(percentageDifference(93, 72).toFixed(2))).toEqual(-25.45)
})
