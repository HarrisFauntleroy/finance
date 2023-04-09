"use strict";
exports.__esModule = true;
exports.useDebounce = void 0;
var react_1 = require("react");
function useDebounce(value, debounce) {
    var _a = (0, react_1.useState)(value), debouncedValue = _a[0], setDebouncedValue = _a[1];
    (0, react_1.useEffect)(function () {
        var timeout = setTimeout(function () {
            setDebouncedValue(value);
        }, debounce);
        return function () { return clearTimeout(timeout); };
    }, [value, debounce]);
    return [debouncedValue, setDebouncedValue];
}
exports.useDebounce = useDebounce;
