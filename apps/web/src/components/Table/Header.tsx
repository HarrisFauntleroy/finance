import { Th } from "@chakra-ui/react"
import type { Header } from "@tanstack/react-table"
import { flexRender } from "@tanstack/react-table"

function TableHeader<TData extends object>(header: Header<TData, unknown>) {
	return (
		<Th key={header.id}>
			{header.isPlaceholder ? null : (
				// rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
				<div
					style={
						header.column.getCanSort()
							? { cursor: "pointer", userSelect: "none" }
							: {}
					}
					onClick={header.column.getToggleSortingHandler()}
				>
					{flexRender(header.column.columnDef.header, header.getContext())}
					{{
						asc: " 🔼",
						desc: " 🔽",
					}[header.column.getIsSorted() as string] ?? null}
				</div>
			)}
		</Th>
	)
}

export default TableHeader
