import { Navbar, rem, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode } from "react";
import { type LinkType } from "./Header";
import { SidebarLinks } from "./SidebarLinks";
import { UserPanel } from "./UserPanel";

export type Disclosure = readonly [
  boolean,
  {
    readonly open: () => void;
    readonly close: () => void;
    readonly toggle: () => void;
  }
];

const SidebarLayout = ({
  linkSection,
  userPanel,
  disclosure,
}: {
  linkSection: ReactNode;
  userPanel: ReactNode;
  disclosure: Disclosure;
}) => {
  const theme = useMantineTheme();
  const [opened] = disclosure;

  return (
    <Navbar
      width={{ base: 0, sm: opened ? 70 : 300 }}
      hiddenBreakpoint="sm"
      hidden
      p="md"
    >
      <Navbar.Section grow mt="xs">
        {linkSection}
      </Navbar.Section>
      <Navbar.Section
        sx={{
          paddingTop: theme.spacing.sm,
          borderTop: `${rem(1)} solid ${
            theme.colorScheme === "dark"
              ? theme.colors.dark[4]
              : theme.colors.gray[2]
          }`,
        }}
      >
        {userPanel}
      </Navbar.Section>
    </Navbar>
  );
};

const Sidebar = ({ links }: { links: LinkType[] }) => {
  const disclosure = useDisclosure(false);

  return (
    <SidebarLayout
      disclosure={disclosure}
      linkSection={<SidebarLinks links={links} disclosure={disclosure} />}
      userPanel={<UserPanel disclosure={disclosure} />}
    />
  );
};

export default Sidebar;
