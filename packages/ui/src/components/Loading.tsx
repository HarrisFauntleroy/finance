import { Center, CircularProgress } from '@chakra-ui/react';
import React from 'react';

export function Loading() {
  return (
    <Center
      position="fixed"
      minWidth="100%"
      minHeight="100%"
      background="transparent"
      top={0}
      left={0}
    >
      <CircularProgress isIndeterminate size="64px" thickness="8px" />
    </Center>
  );
}
