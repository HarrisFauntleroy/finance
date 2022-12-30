import type { ReactNode } from "react"
import React, { Fragment, useState } from "react"

import { useLocalStorage } from "../../hooks/useLocalStorage"
import { DebouncedInput } from "../Form"
import { Show } from "../Show"
import * as Filter from "./Filter"
import { TableHeader } from "./Header"
import { Pagination } from "./Pagination"
import {
	Table as ChakraTable,
	HStack,
	Stack,
	TableContainer,
	Tbody,
	Td,
	Tfoot,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react"
import type { RankingInfo } from "@tanstack/match-sorter-utils"
import * as reactTable from "@tanstack/react-table"

declare module "@tanstack/table-core" {
	interface FilterFns {
		fuzzy: reactTable.FilterFn<unknown>
	}
	interface FilterMeta {
		itemRank: RankingInfo
	}
}

export type TableProps<TData> = {
	/** Table ID allows for persistent state on some table settings */
	id: string
	columns: reactTable.ColumnDef<TData>[]
	data: TData[]
	pageSize?: number
	paginationEnabled?: boolean
	filterEnabled?: boolean
	renderSubComponent?: (props: {
		row: reactTable.Row<TData>
	}) => React.ReactElement
	getRowCanExpand?: boolean
	children?: ReactNode
}

export const Table = <TData extends object>({
	children,
	columns,
	data,
	pageSize,
	renderSubComponent,
	getRowCanExpand,
	filterEnabled,
	paginationEnabled,
	id,
}: TableProps<TData>) => {
	/** Global filter - search */
	const [globalFilter, setGlobalFilter] = React.useState("")

	/** Column filter - search */
	const [columnFilters, setColumnFilters] =
		React.useState<reactTable.ColumnFiltersState>([])

	/** Column sorting */
	const [sorting, setSorting] = useLocalStorage<reactTable.SortingState>(
		`table-sort-${id}`,
		[]
	)

	/** Pagination state */
	const [pagination, setPagination] = useState<reactTable.PaginationState>({
		pageIndex: 0,
		// Default row count
		pageSize: pageSize || 20,
	})

	const table = reactTable.useReactTable({
		data,
		columns,
		filterFns: {
			fuzzy: Filter.fuzzyFilter,
		},
		state: {
			sorting,
			columnFilters,
			globalFilter,
			pagination,
		},
		getRowCanExpand: () => getRowCanExpand || false,
		onPaginationChange: setPagination,
		onSortingChange: setSorting,
		getCoreRowModel: reactTable.getCoreRowModel(),
		getExpandedRowModel: reactTable.getExpandedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		onGlobalFilterChange: setGlobalFilter,
		globalFilterFn: Filter.fuzzyFilter,
		getFilteredRowModel: reactTable.getFilteredRowModel(),
		getSortedRowModel: reactTable.getSortedRowModel(),
		getPaginationRowModel: reactTable.getPaginationRowModel(),
		getFacetedRowModel: reactTable.getFacetedRowModel(),
		getFacetedUniqueValues: reactTable.getFacetedUniqueValues(),
		getFacetedMinMaxValues: reactTable.getFacetedMinMaxValues(),
		/** Debug */
		debugTable: false,
		debugHeaders: false,
		debugColumns: false,
	})

	return (
		<Stack gap={2}>
			<HStack>{children}</HStack>
			<Show when={!!filterEnabled}>
				<DebouncedInput
					value={globalFilter ?? ""}
					onChange={(value) => setGlobalFilter(String(value))}
					placeholder="Search all columns..."
				/>
			</Show>
			<TableContainer>
				<ChakraTable variant="simple" size="sm">
					<Thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<Tr key={headerGroup.id}>
								{headerGroup.headers.map(TableHeader)}
							</Tr>
						))}
					</Thead>
					<Tbody>
						{table.getRowModel().rows.map((row) => (
							<Fragment key={row.id}>
								<Tr>
									{row.getVisibleCells().map((cell) => (
										<Td key={cell.id}>
											{reactTable.flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</Td>
									))}
								</Tr>
								{renderSubComponent && row.getIsExpanded() && (
									<Tr>
										{/* 2nd row is a custom 1 cell row */}
										<Td colSpan={row.getVisibleCells().length}>
											{renderSubComponent({ row })}
										</Td>
									</Tr>
								)}
							</Fragment>
						))}
					</Tbody>
					<Tfoot>
						{table.getFooterGroups().map((footerGroup) => (
							<Tr key={footerGroup.id}>
								{footerGroup.headers.map((header) => (
									<Th key={header.id}>
										{header.isPlaceholder
											? null
											: reactTable.flexRender(
													header.column.columnDef.footer,
													header.getContext()
											  )}
									</Th>
								))}
							</Tr>
						))}
					</Tfoot>
				</ChakraTable>
				{paginationEnabled && <Pagination table={table} id={id} />}
			</TableContainer>
		</Stack>
	)
}