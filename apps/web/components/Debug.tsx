/**
 *
 * Debug component
 * Displays raw object data in a readable format
 * Only displays in development environment
 *
 */

import { Code, Stack, Text } from "@mantine/core";

/** This component will not show up in production */
export function Debug({ data }: { data: unknown }) {
  return process.env.NODE_ENV === "development" ? (
    <Stack mt={4} maw="100vw">
      <Text color="green">Raw data:</Text>
      <Code>{JSON.stringify(data, null, 4)}</Code>
      <Text color="blue">Only visible in development</Text>
    </Stack>
  ) : null;
}

/** If in development environment return true */
export const inDev = () => process.env.NODE_ENV === "development";
