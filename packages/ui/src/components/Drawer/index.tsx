import {
  Drawer as ChakraDrawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/react';
import React, { type ReactNode } from 'react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export function Drawer({ children, onClose, isOpen }: DrawerProps) {
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
