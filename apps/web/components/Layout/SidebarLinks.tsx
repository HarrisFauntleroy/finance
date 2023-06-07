import { Button, Flex } from "@mantine/core";
import { useSession } from "next-auth/react";
import { LinkType } from "./Header";
import { MainLink } from "./MainLink";
import { Disclosure } from "./Sidebar";

export const SidebarLinks = ({
  links,
  disclosure,
}: {
  links: LinkType[];
  disclosure: Disclosure;
}) => {
  const session = useSession();
  const userRole = session?.data?.user?.role;
  const [open, handlers] = disclosure;

  return (
    <Flex direction="column" h="100%">
      {links.map((link) => (
        <MainLink key={link.label} userRole={userRole} open={open} {...link} />
      ))}
      <Button
        variant="subtle"
        style={{ flex: 1 }}
        onClick={() => handlers.toggle()}
      />
    </Flex>
  );
};
