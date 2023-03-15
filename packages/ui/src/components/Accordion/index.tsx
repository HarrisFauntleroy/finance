import type { ReactElement, ReactNode } from "react"
import React, { Children, cloneElement } from "react"

import type { AccordionProps } from "@chakra-ui/react"
import { AccordionItem, Accordion as ChakraAccordion } from "@chakra-ui/react"

export function Accordion({
	children,
	...props
}: { children?: ReactNode } & AccordionProps) {
	return (
		<ChakraAccordion allowToggle defaultIndex={[0]} allowMultiple {...props}>
			{Children.map(children as ReactElement, (child) => (
				<AccordionItem>
					<>{cloneElement(child)}</>
				</AccordionItem>
			))}
		</ChakraAccordion>
	)
}
