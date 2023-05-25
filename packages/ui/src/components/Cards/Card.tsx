import { PropsWithChildren } from "react";

import type { GridItemProps } from "@chakra-ui/react";
import { GridItem } from "@chakra-ui/react";

type CardProps<T> = PropsWithChildren<T> & GridItemProps;
export function Card<T>({ children, ...props }: CardProps<T>) {
  return (
    <GridItem
      boxShadow={{ base: "none", sm: "base" }}
      rounded={{ base: "none", sm: "lg" }}
      padding={{ base: "0.5rem" }}
      height="100%"
      w="100%"
      flex={1}
      {...props}
    >
      {children}
    </GridItem>
  );
}
