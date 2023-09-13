import { Text } from "@mantine/core";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

type MarkdownProperties = { children: string };

export function Markdown({ children }: MarkdownProperties) {
  const parsed = marked(children, { mangle: false, headerIds: false });
  const sanitized = sanitizeHtml(parsed);
  return (
    <Text
      dangerouslySetInnerHTML={{ __html: sanitized }}
      style={{ wordWrap: "break-word" }}
    />
  );
}
