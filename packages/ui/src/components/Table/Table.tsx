import React, { ReactNode, useState } from 'react';

import {
  DeepPartial,
  Stack,
  Table as ChakraTable,
  TableContainer,
  Tbody,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { SubmitHandler } from 'react-hook-form';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { DebouncedInput } from '../Form';
import { Show } from '../Show';
import { fuzzy } from './Filter';
import { TableHeader } from './Header';
import { Pagination } from './Pagination';
import { TableRow } from './TableRow';

interface EditableTableProps<T extends { id: string }> {
  id: string;
  columns: ColumnDef<any, any>[];
  data: DeepPartial<T>[];
  onValidSubmit?: SubmitHandler<T>;
  pageSize?: number;
  paginationEnabled?: boolean;
  filterEnabled?: boolean;
  renderExpandedRow?: ({ row }: { row: Row<T> }) => ReactNode;
  canExpandRows?: boolean;
}

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
}: EditableTableProps<T>) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize || 20,
  });
  const [sorting, setSorting] = useLocalStorage<SortingState>(
    `table-sort-${id}`,
    [],
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
    <Stack height="100%" flex={1}>
      <Show when={!!filterEnabled}>
        <DebouncedInput
          value={globalFilter ?? ''}
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
                key={row.id}
                row={row}
                renderSubRow={renderExpandedRow}
                onValidSubmit={(submitData) => {
                  if (onValidSubmit) return onValidSubmit(submitData);
                  else
                    console.log(
                      'No onValidSubmit handler provided',
                      submitData,
                    );
                }}
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
                          header.getContext(),
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
  );
};
