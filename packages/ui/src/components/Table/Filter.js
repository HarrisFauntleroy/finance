"use strict";
exports.__esModule = true;
exports.fuzzy = exports.renderSubRow = exports.Filter = void 0;
var Debug_1 = require("../Debug");
var match_sorter_utils_1 = require("@tanstack/match-sorter-utils");
function Filter(_a) {
    var _b, _c, _d;
    var column = _a.column, table = _a.table;
    var firstValue = (_b = table
        .getPreFilteredRowModel()
        .flatRows[0]) === null || _b === void 0 ? void 0 : _b.getValue(column.id);
    var columnFilterValue = column.getFilterValue();
    return typeof firstValue === 'number' ? (<div>
      <input type="number" value={(_c = columnFilterValue === null || columnFilterValue === void 0 ? void 0 : columnFilterValue[0]) !== null && _c !== void 0 ? _c : ''} onChange={function (e) {
            return column.setFilterValue(function (old) { return [
                e.target.value,
                old === null || old === void 0 ? void 0 : old[1],
            ]; });
        }} placeholder="Min" className="w-24 border shadow rounded"/>
      <input type="number" value={(_d = columnFilterValue === null || columnFilterValue === void 0 ? void 0 : columnFilterValue[1]) !== null && _d !== void 0 ? _d : ''} onChange={function (e) {
            return column.setFilterValue(function (old) { return [
                old === null || old === void 0 ? void 0 : old[0],
                e.target.value,
            ]; });
        }} placeholder="Max" className="w-24 border shadow rounded"/>
    </div>) : (<input type="text" value={(columnFilterValue !== null && columnFilterValue !== void 0 ? columnFilterValue : '')} onChange={function (e) { return column.setFilterValue(e.target.value); }} placeholder="Search..." className="w-36 border shadow rounded"/>);
}
exports.Filter = Filter;
var renderSubRow = function (_a) {
    var row = _a.row;
    return <Debug_1.Debug data={row.original}/>;
};
exports.renderSubRow = renderSubRow;
function fuzzy(row, columnId, value, addMeta) {
    var itemRank = (0, match_sorter_utils_1.rankItem)(row.getValue(columnId), value);
    addMeta({
        itemRank: itemRank
    });
    return itemRank.passed;
}
exports.fuzzy = fuzzy;
