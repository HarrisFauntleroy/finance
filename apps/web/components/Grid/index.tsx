import type { SimpleGridProps } from "@chakra-ui/react";
import { GridItem, SimpleGrid } from "@chakra-ui/react";
import type { ReactElement } from "react";
import { Children, PropsWithChildren } from "react";

type GridProperties<T> = PropsWithChildren<T> & SimpleGridProps;

export function Grid<T>({ children, ...properties }: GridProperties<T>) {
  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, md: 3 }}
      padding={0}
      width="100%"
      minChildWidth="300px"
      gridAutoFlow="dense"
      gap={2}
      {...properties}
    >
      {Children.map(children as ReactElement, (child) => (
        <GridItem
          key={child.key}
          style={{ height: "100%", width: "100%" }}
          as={child.type}
          {...child.props}
        />
      ))}
    </SimpleGrid>
  );
}
