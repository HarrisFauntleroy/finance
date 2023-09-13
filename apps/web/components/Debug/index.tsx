import { Accordion, Code, Text } from "@mantine/core";

type DebugProperties = { data: unknown };

export function Debug({ data }: DebugProperties) {
  return process.env.NODE_ENV === "development" ? (
    <Accordion>
      <Accordion.Item value="debug">
        <Accordion.Control color="green">
          Click to display debug data
        </Accordion.Control>
        <Accordion.Panel>
          <Text color="green">Raw data:</Text>
          <Code>
            <pre>{JSON.stringify(data, null, 4)}</pre>
          </Code>
          <Text color="blue">Only visible in development</Text>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  ) : null;
}

export const isDevEnvironment = () => process.env.NODE_ENV === "development";
