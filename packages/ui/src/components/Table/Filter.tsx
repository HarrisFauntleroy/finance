/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"

import { Debug } from "../Debug"
import { rankItem } from "@tanstack/match-sorter-utils"
import type { Column, FilterFn, Row, Table } from "@tanstack/react-table"

export function Filter<TData extends object>({
	column,
	table,
}: {
	column: Column<TData>
	table: Table<TData>
}) {
	const firstValue = table
		.getPreFilteredRowModel()
		.flatRows[0]?.getValue(column.id)

	const columnFilterValue = column.getFilterValue()

	return typeof firstValue === "number" ? (
		<div>
			<input
				type="number"
				value={(columnFilterValue as [number, number])?.[0] ?? ""}
				onChange={(e) =>
					column.setFilterValue((old: [number, number]) => [
						e.target.value,
						old?.[1],
					])
				}
				placeholder="Min"
				className="w-24 border shadow rounded"
			/>
			<input
				type="number"
				value={(columnFilterValue as [number, number])?.[1] ?? ""}
				onChange={(e) =>
					column.setFilterValue((old: [number, number]) => [
						old?.[0],
						e.target.value,
					])
				}
				placeholder="Max"
				className="w-24 border shadow rounded"
			/>
		</div>
	) : (
		<input
			type="text"
			value={(columnFilterValue ?? "") as string}
			onChange={(e) => column.setFilterValue(e.target.value)}
			placeholder="Search..."
			className="w-36 border shadow rounded"
		/>
	)
}

export const RenderSubComponent = <TData extends object>({
	row,
}: {
	row: Row<TData>
}) => <Debug data={row.original} />

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
	// Rank the item
	const itemRank = rankItem(row.getValue(columnId), value)

	// Store the itemRank info
	addMeta({
		itemRank,
	})

	// Returns items that pass the filter
	return itemRank.passed
}
