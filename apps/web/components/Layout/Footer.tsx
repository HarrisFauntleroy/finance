/**
 *
 * Footer
 *
 */
import { Flex, Text } from '@mantine/core';
import React from 'react';

export function Footer() {
  return (
    <Flex justify="center" align="center" h="32px">
      <Text>
        Harris Fauntleroy © {new Date().getFullYear().toString()} All rights
        reserved
      </Text>
    </Flex>
  );
}
