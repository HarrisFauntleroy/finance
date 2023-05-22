import { AppShell, MantineTheme } from '@mantine/core';
import { PropsWithChildren } from 'react';

import {
  Gear,
  Bank,
  PiggyBank,
  ChartLineUp,
  Shield,
} from '@phosphor-icons/react';

import Header, { LinkType } from '../Layout/Header';
import Navbar from '../Layout/Navbar';
import Aside from '../Layout/Aside';
import { Role } from 'database/generated/prisma-client';

export function Layout<T>({ children }: PropsWithChildren<T>) {
  const links: LinkType[] = [
    { href: '/portfolio', label: 'Accounts', icon: <Bank />, color: 'grape' },
    {
      href: '/budgets',
      label: 'Budgets',
      icon: <PiggyBank />,
      color: 'teal',
    },
    {
      href: '/markets',
      icon: <ChartLineUp />,
      label: 'Markets',
      color: 'grape',
    },
    {
      href: '/admin',
      icon: <Shield />,
      label: 'Admin',
      role: Role.ADMIN,
      color: 'blue',
    },
    {
      href: '/settings',
      label: 'Settings',
      icon: <Gear />,
      color: 'red',
    },
  ];

  const handleStyles = (theme: MantineTheme) => ({
    main: {
      backgroundColor:
        theme.colorScheme === 'dark'
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
