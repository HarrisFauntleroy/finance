"use strict";
exports.__esModule = true;
exports.Body = void 0;
var react_1 = require("react");
var react_2 = require("@chakra-ui/react");
var Body = function (_a) {
    var children = _a.children;
    return (<react_2.Box transition=".3s ease" padding={{ base: '16px' }}>
      <>{children}</>
    </react_2.Box>);
};
exports.Body = Body;
