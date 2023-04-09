"use strict";
exports.__esModule = true;
exports.Show = void 0;
var react_1 = require("react");
var Show = function (_a) {
    var when = _a.when, children = _a.children;
    return (<div style={{ display: when ? undefined : 'none' }}>
      <>{children}</>
    </div>);
};
exports.Show = Show;
