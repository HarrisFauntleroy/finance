import { Aside as MantineAside, MediaQuery, Text } from "@mantine/core";

const sidebarEnabled = false;

const Aside = () => (
  <>
    {sidebarEnabled && (
      <MediaQuery smallerThan="lg" styles={{ display: "none" }}>
        <MantineAside
          width={{ base: 0, lg: 200, xl: 300 }}
          p="xs"
          hiddenBreakpoint="lg"
          hidden
        >
          <Text>Application sidebar</Text>
        </MantineAside>
      </MediaQuery>
    )}
  </>
);

export default Aside;
