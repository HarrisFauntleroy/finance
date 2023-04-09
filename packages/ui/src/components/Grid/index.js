"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.Grid = void 0;
var react_1 = require("react");
var react_2 = require("@chakra-ui/react");
function Grid(_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    return (<react_2.SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} padding={0} width="100%" minChildWidth="300px" gridAutoFlow="dense" gap={2} {...props}>
      {react_1.Children.map(children, function (child) { return (<react_2.GridItem key={child.key} style={{ height: '100%', width: '100%' }} as={child.type} {...child.props}/>); })}
    </react_2.SimpleGrid>);
}
exports.Grid = Grid;
