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
exports.Accordion = void 0;
var react_1 = require("react");
var react_2 = require("@chakra-ui/react");
function Accordion(_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    return (<react_2.Accordion allowToggle defaultIndex={[0]} allowMultiple {...props}>
      {react_1.Children.map(children, function (child) { return (<react_2.AccordionItem>
          <>{(0, react_1.cloneElement)(child)}</>
        </react_2.AccordionItem>); })}
    </react_2.Accordion>);
}
exports.Accordion = Accordion;
