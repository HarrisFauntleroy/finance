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
exports.Page = void 0;
var react_1 = require("react");
var react_2 = require("@chakra-ui/react");
var head_1 = require("next/head");
function Page(_a) {
    var title = _a.title, children = _a.children, props = __rest(_a, ["title", "children"]);
    return (<react_2.Flex flexDirection="column" flex={1} {...props}>
      <head_1["default"]>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      </head_1["default"]>
      <>{children}</>
    </react_2.Flex>);
}
exports.Page = Page;
