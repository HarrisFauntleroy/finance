"use strict";
exports.__esModule = true;
exports.JSONObjectViewer = void 0;
var JSONObjectViewer = function (_a) {
    var data = _a.data;
    return <pre>{JSON.stringify(data, null, '\t')}</pre>;
};
exports.JSONObjectViewer = JSONObjectViewer;
