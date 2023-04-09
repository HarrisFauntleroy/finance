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
exports.Card = void 0;
/**
 * Generic Card
 */
var react_1 = require("react");
var react_2 = require("@chakra-ui/react");
function Card(_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    return (<react_2.GridItem boxShadow={{ base: 'none', sm: 'base' }} rounded={{ base: 'none', sm: 'lg' }} padding={{ base: '0.5rem' }} height="100%" w="100%" flex={1} {...props}>
      {children}
    </react_2.GridItem>);
}
exports.Card = Card;
