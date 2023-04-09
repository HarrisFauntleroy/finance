"use strict";
exports.__esModule = true;
exports.MarkdownEditor = void 0;
var react_1 = require("react");
var react_markdown_1 = require("react-markdown");
var rehype_katex_1 = require("rehype-katex");
var remark_gfm_1 = require("remark-gfm");
var remark_math_1 = require("remark-math");
var MarkdownEditor = function (_a) {
    var markdown = _a.markdown;
    return (<react_markdown_1["default"] rehypePlugins={[rehype_katex_1["default"]]} remarkPlugins={[remark_gfm_1["default"], remark_math_1["default"]]}>
      {markdown}
    </react_markdown_1["default"]>);
};
exports.MarkdownEditor = MarkdownEditor;
