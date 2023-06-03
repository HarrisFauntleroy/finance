import { Accordion, Code, Text } from "@mantine/core";

export function Debug({ data }: { data: unknown }) {
  return process.env.NODE_ENV === "development" ? (
    <Accordion>
      <Accordion.Item value="debug">
        <Accordion.Control color="green">
          Click to display debug data
        </Accordion.Control>
        <Accordion.Panel>
          <Text color="green">Raw data:</Text>
          <Code>{JSON.stringify(data, null, 4)}</Code>
          <Text color="blue">Only visible in development</Text>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  ) : null;
}

export const inDev = () => process.env.NODE_ENV === "development";
