import React from "react"

import "katex/dist/katex.min.css"
import ReactMarkdown from "react-markdown"
import rehypeKatex from "rehype-katex"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"

const markdown = `
One of the most important concepts in finance is the time value of money, which states that a dollar received in the future is worth less than a dollar received today. This concept can be mathematically represented using the formula:

$$ FV = PV \cdot (1 + r)^t $$

where $FV$ is the future value of the money, $PV$ is the present value, $r$ is the interest rate, and $t$ is the number of time periods.

For example, if you have $PV = 100$ dollars today and the interest rate is $r = 0.05$, the future value of your money after 5 years (assuming annual compounding) is:

$$ FV = 100 \cdot (1 + 0.05)^5 = 126.28 $$


![ ](https://media.giphy.com/media/eNAsjO55tPbgaor7ma/giphy.gif)

$$ L = \frac{1}{2} \rho v^2 S C_L
$$

The angular velocity of an object is given by the formula:

$$ \omega = \frac{d\theta}{dt} $$

where $\omega$ is the angular velocity (in radians per second), $d\theta$ is the change in angle (in radians), and $dt$ is the change in time (in seconds).

For example, if an object rotates through an angle of $\theta = 90^\circ$ in a time of $t = 10$ seconds, its angular velocity is:

$$ \omega = \frac{90^\circ}{10\text{ s}} = 9^\circ/\text{s} $$

[Link to a Graph](test/fixtures/assets/example.mmd "mermaid:")
![Embed image of graph](test/fixtures/assets/example.mdd "mermaid:")

A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |

The following are some examples of the diagrams, charts and graphs that can be made using Mermaid and the Markdown-inspired text specific to it. 

\`\`\`mermaid
graph TD
A[Hard] -->|Text| B(Round)
B --> C{Decision}
C -->|One| D[Result 1]
C -->|Two| E[Result 2]
\`\`\`

\`\`\`mermaid
sequenceDiagram
Alice->>John: Hello John, how are you?
loop Healthcheck
    John->>John: Fight against hypochondria
end
Note right of John: Rational thoughts!
John-->>Alice: Great!
John->>Bob: How about you?
Bob-->>John: Jolly good!
\`\`\`
`

export const MarkdownEditor = () => {
	return (
		<ReactMarkdown
			rehypePlugins={[rehypeKatex]}
			remarkPlugins={[remarkGfm, remarkMath]}
		>
			{markdown}
		</ReactMarkdown>
	)
}
