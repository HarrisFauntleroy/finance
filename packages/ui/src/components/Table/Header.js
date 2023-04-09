"use strict";
exports.__esModule = true;
exports.TableHeader = void 0;
var react_1 = require("react");
var react_2 = require("@chakra-ui/react");
var react_table_1 = require("@tanstack/react-table");
function TableHeader(header) {
    var _a;
    return (<react_2.Th key={header.id}>
      {header.isPlaceholder ? null : (<div style={header.column.getCanSort()
                ? { cursor: 'pointer', userSelect: 'none' }
                : {}} onClick={header.column.getToggleSortingHandler()}>
          {(0, react_table_1.flexRender)(header.column.columnDef.header, header.getContext())}
          {(_a = {
                asc: ' 🔼',
                desc: ' 🔽'
            }[header.column.getIsSorted()]) !== null && _a !== void 0 ? _a : null}
        </div>)}
    </react_2.Th>);
}
exports.TableHeader = TableHeader;
