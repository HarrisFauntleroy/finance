import React from 'react';

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Text,
  type UseDisclosureProps,
} from '@chakra-ui/react';
import { SidebarContent } from 'components/Layout/SidebarContent';
import type { Role } from 'database/generated/prisma-client';
import Link from 'next/link';
import type { IconType } from 'react-icons';

export interface SidebarLink {
  href: string;
  icon: IconType;
  label: string;
  role?: Role;
}

interface SidebarProps extends Omit<UseDisclosureProps, 'isOpen' | 'onClose'> {
  links: SidebarLink[];
  isOpen: boolean;
  onClose(): void;
}

export default function Sidebar({ links, ...props }: SidebarProps) {
  return (
    <>
      <SidebarContent
        links={links}
        w={{ sm: '64px', lg: '200px' }}
        borderRight="none"
        display={{ base: 'none', sm: 'unset' }}
      />
      <Drawer isOpen={props.isOpen} onClose={props.onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent maxWidth="200px" aria-modal="true">
          <SidebarContent links={links} w="full" borderRight="none" drawer />
        </DrawerContent>
        <DrawerFooter>
          <Text textAlign="center">
            Price data provided by{' '}
            <Link href="https://www.coingecko.com">CoinGecko</Link>
          </Text>
        </DrawerFooter>
      </Drawer>
    </>
  );
}
