import { ReactNode, useState } from "react";

import { Table as MantineTable, Stack } from "@mantine/core";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { DebouncedInput } from "../Form/DebouncedInput";
import { fuzzy } from "./Filter";
import { TableHeader } from "./Header";
import { Pagination } from "./Pagination";
import { TableRow } from "./TableRow";

import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  Row,
  SortingState,
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
} from "@tanstack/react-table";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Show } from "../Layout/Show";

type TableProps<T extends { id: string }> = {
  id: string;
  columns: ColumnDef<T>[] | Column<T>[];
  data: T[];
  onValidSubmit?: SubmitHandler<FieldValues>;
  pageSize?: number;
  paginationEnabled?: boolean;
  filterEnabled?: boolean;
  renderExpandedRow?: ({ row }: { row: Row<T> }) => ReactNode;
  canExpandRows?: boolean;
};

export const Table = <T extends { id: string }>({
  columns,
  data,
  pageSize,
  renderExpandedRow,
  canExpandRows,
  filterEnabled,
  paginationEnabled,
  id,
  onValidSubmit,
}: TableProps<T>) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize || 20,
  });
  const [sorting, setSorting] = useLocalStorage<SortingState>(
    `table-sort-${id}`,
    []
  );
  const table = useReactTable({
    data: data || [],
    columns,
    filterFns: {
      fuzzy,
    },
    state: {
      sorting,
      columnFilters,
      globalFilter,
      pagination,
    },
    getRowCanExpand: () => canExpandRows || false,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzy,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: false,
    debugHeaders: false,
    debugColumns: false,
  });

  return (
    <Stack h="100%">
      <Show when={!!filterEnabled}>
        <DebouncedInput
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
        />
      </Show>
      <MantineTable h="100%">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>{headerGroup.headers.map(TableHeader)}</tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              row={row}
              renderSubRow={renderExpandedRow}
              onValidSubmit={(submitData) => {
                if (onValidSubmit) return onValidSubmit(submitData);
                else
                  console.log("No onValidSubmit handler provided", submitData);
              }}
            />
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </MantineTable>
      {paginationEnabled && <Pagination table={table} id={id} />}
    </Stack>
  );
};
