import { AppShell, MantineTheme } from "@mantine/core";
import { Bank, ChartLineUp, PiggyBank, Shield } from "@phosphor-icons/react";
import { Role } from "database/generated/prisma-client";
import { PropsWithChildren } from "react";
import Aside from "../Layout/Aside";
import Header, { LinkType } from "../Layout/Header";
import Sidebar from "./Sidebar";

const handleStyles = (theme: MantineTheme) => ({
  main: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[8]
        : theme.colors.gray[0],
  },
});

export function Layout<T>({ children }: PropsWithChildren<T>) {
  const links: LinkType[] = [
    {
      href: "/portfolio",
      label: "Accounts",
      icon: <Bank />,
      expectedRole: Role.USER,
      color: "grape",
    },
    {
      href: "/budgets",
      label: "Budgets",
      icon: <PiggyBank />,
      expectedRole: Role.USER,
      color: "teal",
    },
    {
      href: "/markets",
      icon: <ChartLineUp />,
      label: "Markets",
      color: "grape",
    },
    {
      href: "/admin",
      icon: <Shield />,
      label: "Admin",
      expectedRole: Role.ADMIN,
      color: "blue",
    },
  ];

  return (
    <AppShell
      header={<Header links={links} />}
      navbar={<Sidebar links={links} />}
      aside={<Aside />}
      styles={handleStyles}
    >
      {children}
    </AppShell>
  );
}
