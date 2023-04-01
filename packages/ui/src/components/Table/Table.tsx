import React, { useCallback, useState } from "react"

import { useLocalStorage } from "../../hooks/useLocalStorage"
import { DebouncedInput } from "../Form"
import { Show } from "../Show"
import * as Filter from "./Filter"
import { TableHeader } from "./Header"
import { Pagination } from "./Pagination"
import {
	Button,
	ButtonGroup,
	Table as ChakraTable,
	DeepPartial,
	Input,
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
import type {
	Cell,
	ColumnDef,
	ColumnFiltersState,
	FilterFn,
	PaginationState,
	Row,
	SortingState,
} from "@tanstack/react-table"
import {
	flexRender,
	getCoreRowModel,
	getExpandedRowModel,
	getFacetedMinMaxValues,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table"
import {
	FormProvider,
	SubmitHandler,
	useForm,
	useFormContext,
} from "react-hook-form"
import { BsCheck, BsPencil, BsStop } from "react-icons/bs"

declare module "@tanstack/table-core" {
	interface FilterFns {
		fuzzy: FilterFn<unknown>
	}
	interface FilterMeta {
		itemRank: RankingInfo
	}
}

function EditableCell<T>({
	cell,
	editing,
}: {
	cell: Cell<T, string>
	editing: boolean
}) {
	const { register } = useFormContext()

	return editing ? (
		<Input
			defaultValue={cell.row.original[cell.column.id]}
			readOnly={!editing}
			{...register(cell.column.id)}
		/>
	) : (
		<>{flexRender(cell.column.columnDef.cell, cell.getContext())}</>
	)
}

export type TableProps<T> = {
	id: string
	columns: any[]
	data?: T[]
	pageSize?: number
	paginationEnabled?: boolean
	filterEnabled?: boolean
	renderSubRow?: ({ row }: { row: Row<T> }) => T
	getRowCanExpand?: boolean
}

interface EditableTableProps<T extends { id: string }> {
	id: string
	columns: ColumnDef<any, any>[]
	data: DeepPartial<T>[]
	onValidSubmit: SubmitHandler<T>
	pageSize?: number
	paginationEnabled?: boolean
	filterEnabled?: boolean
	renderSubRow?: ({ row }: { row: Row<T> }) => T
	getRowCanExpand?: boolean
}

export const Table = <T extends { id: string }>({
	columns,
	data,
	pageSize,
	renderSubRow,
	getRowCanExpand,
	filterEnabled,
	paginationEnabled,
	id,
	onValidSubmit,
}: EditableTableProps<T>) => {
	const [globalFilter, setGlobalFilter] = useState("")
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: pageSize || 20,
	})
	const [sorting, setSorting] = useLocalStorage<SortingState>(
		`table-sort-${id}`,
		[]
	)
	const table = useReactTable({
		data: data || [],
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
		getCoreRowModel: getCoreRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		onGlobalFilterChange: setGlobalFilter,
		globalFilterFn: Filter.fuzzyFilter,
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getFacetedMinMaxValues: getFacetedMinMaxValues(),
		/** Debug */
		debugTable: false,
		debugHeaders: false,
		debugColumns: false,
	})

	return (
		<Stack height="100%" flex={1}>
			<Show when={!!filterEnabled}>
				<DebouncedInput
					value={globalFilter ?? ""}
					onChange={(value) => setGlobalFilter(String(value))}
					placeholder="Search all columns..."
				/>
			</Show>
			<TableContainer height="100%">
				<ChakraTable height="100%" flex={1} overflow="scroll" maxWidth="100%">
					<Thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<Tr key={headerGroup.id}>
								{headerGroup.headers.map(TableHeader)}
							</Tr>
						))}
					</Thead>
					<Tbody>
						{table.getRowModel().rows.map((row) => (
							<TableRow
								row={row}
								renderSubRow={renderSubRow}
								onValidSubmit={onValidSubmit}
							/>
						))}
					</Tbody>
					<Tfoot>
						{table.getFooterGroups().map((footerGroup) => (
							<Tr key={footerGroup.id}>
								{footerGroup.headers.map((header) => (
									<Th key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
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

function TableRow<T>({
	row,
	renderSubRow,
	onValidSubmit,
}: {
	row: Row<any>
	renderSubRow: (({ row }: { row: Row<T> }) => T) | undefined
	onValidSubmit: SubmitHandler<any>
}) {
	const [editingId, setEditingId] = useState<string | null>(null)

	const handleSave = useCallback(() => {
		onValidSubmit(methods.getValues())
		setEditingId(null)
	}, [onValidSubmit])

	const handleCancel = () => {
		setEditingId(null)
	}

	const methods = useForm()

	const editing = editingId === row.id
	const handleEdit = () => setEditingId(row.id)

	return (
		<FormProvider {...methods} key={row.id}>
			<Tr>
				{row.getVisibleCells().map((cell) => (
					<Td key={cell.id}>
						<EditableCell cell={cell} editing={editing} />
					</Td>
				))}

				<Td>
					{editing ? (
						<ButtonGroup>
							<Button onClick={() => handleSave()}>
								<BsCheck color="green" />
							</Button>
							<Button onClick={handleCancel}>
								<BsStop color="red" />
							</Button>
						</ButtonGroup>
					) : (
						<Button onClick={handleEdit}>
							<BsPencil color="blue" />
						</Button>
					)}
				</Td>
			</Tr>
			{renderSubRow && row.getIsExpanded() && (
				<Tr>
					{/* 2nd row is a custom 1 cell row */}
					<Td colSpan={row.getVisibleCells().length}>
						{renderSubRow({ row })}
					</Td>
				</Tr>
			)}
		</FormProvider>
	)
}
