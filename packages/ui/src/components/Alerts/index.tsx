import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';
import React from 'react';

export type AlertPopProps = {
  label?: string;
};

export function AlertPop({ label }: AlertPopProps) {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>{label}</AlertTitle>
    </Alert>
  );
}
