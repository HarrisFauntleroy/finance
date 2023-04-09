"use strict";
exports.__esModule = true;
exports.Loading = void 0;
var react_1 = require("react");
var react_2 = require("@chakra-ui/react");
function Loading() {
    return (<react_2.Center position="fixed" minWidth="100%" minHeight="100%" background="transparent" top={0} left={0}>
      <react_2.CircularProgress isIndeterminate size="64px" thickness="8px"/>
    </react_2.Center>);
}
exports.Loading = Loading;
