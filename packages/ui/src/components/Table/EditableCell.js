"use strict";
exports.__esModule = true;
exports.EditableCell = void 0;
var react_1 = require("@chakra-ui/react");
var react_table_1 = require("@tanstack/react-table");
var react_hook_form_1 = require("react-hook-form");
function EditableCell(_a) {
    var cell = _a.cell, editing = _a.editing;
    var register = (0, react_hook_form_1.useFormContext)().register;
    return editing ? (<react_1.Input defaultValue={String(cell.row.original[cell.column.id])} readOnly={!editing} {...register(cell.column.id)}/>) : (<>{(0, react_table_1.flexRender)(cell.column.columnDef.cell, cell.getContext())}</>);
}
exports.EditableCell = EditableCell;
