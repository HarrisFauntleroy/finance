
import React from 'react'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { prism } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import 'github-markdown-css/github-markdown.css'
import ReactMarkdown from 'react-markdown'
import type { CodeProps } from "react-markdown/lib/ast-to-react";
import CopyBtn from './CopyButton'
import styles from '~/styles/react-markdown.module.css'


interface Props {
  doc: string
}

const Preview = (props: Props) => {
  return <div className='preview markdown-body'>
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className={styles.reactMarkDown}
      components={{
        pre({ ...preProps }) { return <pre {...preProps} /> },
        code({ inline, className, children, ...codeProps }: CodeProps) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <CopyBtn codeText={String(children)}>
              <SyntaxHighlighter
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                style={prism as any}
                language={match[1]}
                PreTag="div"
                {...codeProps}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            </CopyBtn>
          ) : (
            <code className={className} {...codeProps}>
              {children}
            </code>
          )
        }
      }}
    >
      {props.doc}
    </ReactMarkdown>
  </div>
}

export default Preview
