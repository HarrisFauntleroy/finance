export const mapWithMatchingData = (
	items: any[],
	dataSource: any[],
	matchKey: string,
	dataKey: string
) => {
	return items.map((item) => {
		const matchingData = dataSource.find(
			(data) => data[matchKey] === item[matchKey]
		)
		if (matchingData) {
			return {
				...item,
				[dataKey]: matchingData[dataKey],
			}
		}
		return item
	})
}
