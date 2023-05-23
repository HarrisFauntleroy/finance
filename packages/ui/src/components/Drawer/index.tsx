import { PropsWithChildren } from "react";

import {
  Drawer as ChakraDrawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";

type DrawerProps<T> = PropsWithChildren<T> & {
  isOpen: boolean;
  onClose: () => void;
};

export function Drawer<T>({ children, onClose, isOpen }: DrawerProps<T>) {
  return (
    <ChakraDrawer placement="right" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <>
          <DrawerCloseButton />
          {children}
        </>
      </DrawerContent>
    </ChakraDrawer>
  );
}
