import { Children, PropsWithChildren, cloneElement } from "react";

import type { AccordionProps as ChakraAccordionProps } from "@chakra-ui/react";
import { AccordionItem, Accordion as ChakraAccordion } from "@chakra-ui/react";
import type { ReactElement } from "react";

type AccordionProps<T> = PropsWithChildren<T> & ChakraAccordionProps;

export function Accordion<T>({ children, ...props }: AccordionProps<T>) {
  return (
    <ChakraAccordion allowToggle defaultIndex={[0]} allowMultiple {...props}>
      {Children.map(children as ReactElement, (child) => (
        <AccordionItem>
          <>{cloneElement(child)}</>
        </AccordionItem>
      ))}
    </ChakraAccordion>
  );
}
