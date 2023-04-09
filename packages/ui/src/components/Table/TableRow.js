"use strict";
exports.__esModule = true;
exports.TableRow = void 0;
var react_1 = require("react");
var EditableCell_1 = require("./EditableCell");
var react_2 = require("@chakra-ui/react");
var react_hook_form_1 = require("react-hook-form");
var bs_1 = require("react-icons/bs");
function TableRow(_a) {
    var row = _a.row, renderSubRow = _a.renderSubRow, onValidSubmit = _a.onValidSubmit;
    var _b = (0, react_1.useState)(null), editingId = _b[0], setEditingId = _b[1];
    var methods = (0, react_hook_form_1.useForm)();
    var handleSave = (0, react_1.useCallback)(function () {
        onValidSubmit(methods.getValues());
        setEditingId(null);
    }, [onValidSubmit]);
    var handleCancel = function () {
        setEditingId(null);
    };
    var editing = editingId === row.id;
    var handleEdit = function () { return setEditingId(row.id); };
    return (<react_hook_form_1.FormProvider {...methods} key={row.id}>
      <react_2.Tr>
        {row.getVisibleCells().map(function (cell) { return (<react_2.Td key={cell.id}>
            <EditableCell_1.EditableCell cell={cell} editing={editing}/>
          </react_2.Td>); })}

        <react_2.Td>
          {editing ? (<react_2.ButtonGroup>
              <react_2.Button onClick={function () { return handleSave(); }}>
                <bs_1.BsCheck color="green"/>
              </react_2.Button>
              <react_2.Button onClick={handleCancel}>
                <bs_1.BsStop color="red"/>
              </react_2.Button>
            </react_2.ButtonGroup>) : (<react_2.Button onClick={handleEdit}>
              <bs_1.BsPencil color="blue"/>
            </react_2.Button>)}
        </react_2.Td>
      </react_2.Tr>
      {renderSubRow && row.getIsExpanded() && (<react_2.Tr>
          {/* 2nd row is a custom 1 cell row */}
          <react_2.Td colSpan={row.getVisibleCells().length}>
            <>{renderSubRow({ row: row })}</>
          </react_2.Td>
        </react_2.Tr>)}
    </react_hook_form_1.FormProvider>);
}
exports.TableRow = TableRow;
