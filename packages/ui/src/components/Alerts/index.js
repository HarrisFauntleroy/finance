"use strict";
exports.__esModule = true;
exports.AlertPop = void 0;
var react_1 = require("react");
var react_2 = require("@chakra-ui/react");
function AlertPop(_a) {
    var label = _a.label;
    return (<react_2.Alert status="error">
      <react_2.AlertIcon />
      <react_2.AlertTitle mr={2}>{label}</react_2.AlertTitle>
    </react_2.Alert>);
}
exports.AlertPop = AlertPop;
