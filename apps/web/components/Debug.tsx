import { Heading, Stack } from "@chakra-ui/react";
import { JSONObjectViewer } from "./JSON";

/** This component will not show up in production */
export function Debug({ data }: { data: unknown }) {
  return process.env.NODE_ENV === "development" ? (
    <Stack mt={4} overflow="scroll" maxW="100vw">
      <Heading fontSize="16px">Raw data:</Heading>
      <JSONObjectViewer data={data} />
    </Stack>
  ) : null;
}

/** If in development environment return true */
export const inDev = () => process.env.NODE_ENV === "development";
