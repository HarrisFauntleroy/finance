"use strict";
exports.__esModule = true;
exports.Table = void 0;
var react_1 = require("react");
var useLocalStorage_1 = require("../../hooks/useLocalStorage");
var Form_1 = require("../Form");
var Show_1 = require("../Show");
var Filter_1 = require("./Filter");
var Header_1 = require("./Header");
var Pagination_1 = require("./Pagination");
var TableRow_1 = require("./TableRow");
var react_2 = require("@chakra-ui/react");
var react_table_1 = require("@tanstack/react-table");
var Table = function (_a) {
    var columns = _a.columns, data = _a.data, pageSize = _a.pageSize, renderExpandedRow = _a.renderExpandedRow, canExpandRows = _a.canExpandRows, filterEnabled = _a.filterEnabled, paginationEnabled = _a.paginationEnabled, id = _a.id, onValidSubmit = _a.onValidSubmit;
    var _b = (0, react_1.useState)(''), globalFilter = _b[0], setGlobalFilter = _b[1];
    var _c = (0, react_1.useState)([]), columnFilters = _c[0], setColumnFilters = _c[1];
    var _d = (0, react_1.useState)({
        pageIndex: 0,
        pageSize: pageSize || 20
    }), pagination = _d[0], setPagination = _d[1];
    var _e = (0, useLocalStorage_1.useLocalStorage)("table-sort-".concat(id), []), sorting = _e[0], setSorting = _e[1];
    var table = (0, react_table_1.useReactTable)({
        data: data || [],
        columns: columns,
        filterFns: {
            fuzzy: Filter_1.fuzzy
        },
        state: {
            sorting: sorting,
            columnFilters: columnFilters,
            globalFilter: globalFilter,
            pagination: pagination
        },
        getRowCanExpand: function () { return canExpandRows || false; },
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        getCoreRowModel: (0, react_table_1.getCoreRowModel)(),
        getExpandedRowModel: (0, react_table_1.getExpandedRowModel)(),
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: Filter_1.fuzzy,
        getFilteredRowModel: (0, react_table_1.getFilteredRowModel)(),
        getSortedRowModel: (0, react_table_1.getSortedRowModel)(),
        getPaginationRowModel: (0, react_table_1.getPaginationRowModel)(),
        getFacetedRowModel: (0, react_table_1.getFacetedRowModel)(),
        getFacetedUniqueValues: (0, react_table_1.getFacetedUniqueValues)(),
        getFacetedMinMaxValues: (0, react_table_1.getFacetedMinMaxValues)(),
        debugTable: false,
        debugHeaders: false,
        debugColumns: false
    });
    return (<react_2.Stack height="100%" flex={1}>
      <Show_1.Show when={!!filterEnabled}>
        <Form_1.DebouncedInput value={globalFilter !== null && globalFilter !== void 0 ? globalFilter : ''} onChange={function (value) { return setGlobalFilter(String(value)); }} placeholder="Search all columns..."/>
      </Show_1.Show>
      <react_2.TableContainer height="100%">
        <react_2.Table height="100%" flex={1} overflow="scroll" maxWidth="100%">
          <react_2.Thead>
            {table.getHeaderGroups().map(function (headerGroup) { return (<react_2.Tr key={headerGroup.id}>
                {headerGroup.headers.map(Header_1.TableHeader)}
              </react_2.Tr>); })}
          </react_2.Thead>
          <react_2.Tbody>
            {table.getRowModel().rows.map(function (row) { return (<TableRow_1.TableRow key={row.id} row={row} renderSubRow={renderExpandedRow} onValidSubmit={function (submitData) {
                if (onValidSubmit)
                    return onValidSubmit(submitData);
                else
                    console.log('No onValidSubmit handler provided', submitData);
            }}/>); })}
          </react_2.Tbody>
          <react_2.Tfoot>
            {table.getFooterGroups().map(function (footerGroup) { return (<react_2.Tr key={footerGroup.id}>
                {footerGroup.headers.map(function (header) { return (<react_2.Th key={header.id}>
                    {header.isPlaceholder
                    ? null
                    : (0, react_table_1.flexRender)(header.column.columnDef.footer, header.getContext())}
                  </react_2.Th>); })}
              </react_2.Tr>); })}
          </react_2.Tfoot>
        </react_2.Table>
        {paginationEnabled && <Pagination_1.Pagination table={table} id={id}/>}
      </react_2.TableContainer>
    </react_2.Stack>);
};
exports.Table = Table;
