/**
 *
 * Default layout
 * Style: Golden Ratio
 *
 */

import {
  Gear,
  Bank,
  PiggyBank,
  ChartLineUp,
  House,
  Shield,
} from '@phosphor-icons/react';
import { Footer } from './Footer';

import { useDisclosure } from '@chakra-ui/react';
import Header from '../Layout/Header';
import type { PropsWithChildren } from 'react';
import { Container, Stack } from '@mantine/core';
import { Role } from 'database/generated/prisma-client';

export function Layout<T>({ children }: PropsWithChildren<T>) {
  const disclosure = useDisclosure();

  const headerLinks = [
    { href: '/', label: 'Home', icon: House },
    { href: '/portfolio', label: 'Accounts', icon: Bank },
    { href: '/budgets', label: 'Budgets', icon: PiggyBank },
    {
      href: '/markets',
      icon: ChartLineUp,
      label: 'Markets',
    },
    {
      href: '/admin',
      icon: Shield,
      label: 'Admin',
      role: Role.ADMIN,
    },
    {
      href: '/settings',
      label: 'Settings',
      icon: Gear,
    },
  ];

  return (
    <Stack h="100vh" w="100vw">
      <Header {...disclosure} links={headerLinks} />
      <Container fluid h="100%" w="100%">
        {children}
      </Container>
      <Footer />
    </Stack>
  );
}
