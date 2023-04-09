import { ReactNode, useState } from 'react';

import { fuzzyNew } from './Filter';
import { TableHeaderNew } from './Header';
import { PaginationNew } from './Pagination';
import { TableRowNew } from './TableRow';

import {
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
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { DebouncedInput } from 'ui/src/components/Form';
import { Show } from 'ui/src/components/Show';
import { useLocalStorage } from 'ui/src/hooks/useLocalStorage';

interface EditableTableProps<T extends FieldValues> {
  id: string;
  columns: ColumnDef<T, unknown>[];
  data: T[];
  onValidSubmit: SubmitHandler<FieldValues>;
  pageSize?: number;
  paginationEnabled?: boolean;
  filterEnabled?: boolean;
  renderExpandedRow?: ({ row }: { row: Row<T> }) => ReactNode;
  canExpandRows?: boolean;
}

export const TableNew = <T extends FieldValues>({
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
      fuzzy: fuzzyNew,
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
    globalFilterFn: fuzzyNew,
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
                {headerGroup.headers.map(TableHeaderNew)}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <TableRowNew
                key={row.id}
                row={row}
                renderSubRow={renderExpandedRow}
                onValidSubmit={onValidSubmit}
              />
            ))}
          </Tbody>
          <Tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <Tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <Th key={header.id}>
                    <>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext(),
                          )}
                    </>
                  </Th>
                ))}
              </Tr>
            ))}
          </Tfoot>
        </ChakraTable>
        {paginationEnabled && <PaginationNew table={table} id={id} />}
      </TableContainer>
    </Stack>
  );
};
