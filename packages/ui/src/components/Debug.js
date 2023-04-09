"use strict";
exports.__esModule = true;
exports.inDev = exports.Debug = void 0;
/**
 *
 * Debug component
 * Displays raw object data in a readable format
 * Only displays in development environment
 *
 */
var react_1 = require("react");
var react_2 = require("@chakra-ui/react");
/** This component will not show up in production */
function Debug(_a) {
    var data = _a.data;
    return process.env.NODE_ENV === 'development' ? (<react_2.Stack mt={4} overflow="scroll" maxW="100vw">
      <react_2.Heading fontSize="16px">Raw data:</react_2.Heading>
      <pre style={{ fontSize: '11px' }}>{JSON.stringify(data, null, 4)}</pre>
    </react_2.Stack>) : null;
}
exports.Debug = Debug;
/** If in development environment return true */
var inDev = function () { return process.env.NODE_ENV === 'development'; };
exports.inDev = inDev;
