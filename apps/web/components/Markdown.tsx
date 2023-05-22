import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

// This is a simple wrapper around the marked library to render markdown
export function Markdown({ children }: { children: string }) {
  const parsed = marked(children, { mangle: false, headerIds: false });
  const sanitized = sanitizeHtml(parsed);
  return <div dangerouslySetInnerHTML={{ __html: sanitized }}></div>;
}
