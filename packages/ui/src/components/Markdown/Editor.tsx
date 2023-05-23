import React from "react";

import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

export const MarkdownEditor = ({ markdown }: { markdown: string }) => {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeKatex]}
      remarkPlugins={[remarkGfm, remarkMath]}
    >
      {markdown}
    </ReactMarkdown>
  );
};
