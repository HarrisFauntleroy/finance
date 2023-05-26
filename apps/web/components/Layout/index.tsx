import { AppShell, MantineTheme } from "@mantine/core";
import { PropsWithChildren } from "react";

import {
  Bank,
  ChartLineUp,
  Gear,
  PiggyBank,
  Shield,
} from "@phosphor-icons/react";

import { Role } from "@alchemical-finance/database/generated/prisma-client";
import Aside from "../Layout/Aside";
import Header, { LinkType } from "../Layout/Header";
import Navbar from "../Layout/Navbar";

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
    {
      href: "/settings",
      label: "Settings",
      icon: <Gear />,
      expectedRole: Role.USER,
      color: "red",
    },
  ];

  const handleStyles = (theme: MantineTheme) => ({
    main: {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  });

  return (
    <AppShell
      header={<Header links={links} />}
      navbar={<Navbar links={links} />}
      aside={<Aside />}
      styles={handleStyles}
    >
      {children}
    </AppShell>
  );
}
