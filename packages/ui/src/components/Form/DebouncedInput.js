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
exports.DebouncedInput = void 0;
var react_1 = require("react");
var useDebounce_1 = require("../../hooks/useDebounce");
var react_2 = require("@chakra-ui/react");
var DebouncedInput = function (_a) {
    var initialValue = _a.value, onChange = _a.onChange, _b = _a.debounce, debounce = _b === void 0 ? 500 : _b, props = __rest(_a, ["value", "onChange", "debounce"]);
    var _c = (0, react_1.useState)(initialValue), value = _c[0], setValue = _c[1];
    var debouncedValue = (0, useDebounce_1.useDebounce)(value, debounce)[0];
    (0, react_1.useEffect)(function () {
        setValue(initialValue);
    }, [initialValue]);
    (0, react_1.useEffect)(function () {
        onChange(debouncedValue);
    }, [debouncedValue, onChange]);
    var handleChange = function (e) {
        setValue(e.target.value);
    };
    return <react_2.Input {...props} size="sm" value={value} onChange={handleChange}/>;
};
exports.DebouncedInput = DebouncedInput;
