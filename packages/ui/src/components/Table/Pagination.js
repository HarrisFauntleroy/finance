"use strict";
exports.__esModule = true;
exports.Pagination = void 0;
var react_1 = require("@chakra-ui/react");
function Pagination(_a) {
    var table = _a.table, id = _a.id;
    return (<react_1.Flex gap={1}>
      <react_1.Button size="xs" className="border rounded p-1" onClick={function () { return table.setPageIndex(0); }} disabled={!table.getCanPreviousPage()}>
        {'<<'}
      </react_1.Button>
      <react_1.Button size="xs" className="border rounded p-1" onClick={function () { return table.previousPage(); }} disabled={!table.getCanPreviousPage()}>
        {'<'}
      </react_1.Button>
      <react_1.Button size="xs" className="border rounded p-1" onClick={function () { return table.nextPage(); }} disabled={!table.getCanNextPage()}>
        {'>'}
      </react_1.Button>
      <react_1.Button size="xs" className="border rounded p-1" onClick={function () { return table.setPageIndex(table.getPageCount() - 1); }} disabled={!table.getCanNextPage()}>
        {'>>'}
      </react_1.Button>
      <react_1.Flex gap={1}>
        <react_1.Flex gap={1}>Page</react_1.Flex>
        <react_1.Text>
          {"".concat(table.getState().pagination.pageIndex + 1, " of ").concat(table.getPageCount())}
        </react_1.Text>
      </react_1.Flex>
      | Go to page:
      <react_1.Input size="sm" type="number" defaultValue={table.getState().pagination.pageIndex + 1} onChange={function (e) {
            var page = e.target.value ? Number(e.target.value) - 1 : 0;
            table.setPageIndex(page);
        }}/>
      <react_1.Select size="sm" value={table.getState().pagination.pageSize} onChange={function (e) {
            table.setPageSize(Number(e.target.value));
        }}>
        {[4, 10, 20, 30, 40, 50].map(function (pageSize) { return (<option key={"".concat(id, "-pagination-").concat(pageSize)} value={pageSize}>
            Show {pageSize}
          </option>); })}
      </react_1.Select>
    </react_1.Flex>);
}
exports.Pagination = Pagination;
