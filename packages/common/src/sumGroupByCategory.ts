export const sumGroupByCategory = (arr: any[], category: string) =>
	arr.reduce(
		(
			grouped: { [x: string]: { add: (arg0: any) => any } },
			obj: { [x: string]: string | number; value: any }
		) => {
			if (!grouped[obj[category]]) grouped[obj[category]] = currencyjs(0)
			grouped[obj[category]] = grouped[obj[category]].add(obj.value)
			return grouped
		},
		{}
	)
