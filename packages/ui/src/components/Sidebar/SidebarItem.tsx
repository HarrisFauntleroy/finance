import React from 'react';

import { Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { IconType } from 'react-icons';

type SidebarItemProps = {
  label: string;
  icon: IconType;
  href?: string;
  drawer?: boolean;
};

export function SidebarItem({ icon, label, drawer, href }: SidebarItemProps) {
  const color = useColorModeValue('gray.600', 'gray.300');
  const bg = useColorModeValue('gray.100', 'gray.800');

  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link href={href || '#'}>
      <Flex
        align="center"
        justify={{ base: drawer ? 'left' : 'center', md: 'left' }}
        cursor="pointer"
        padding="8px"
        height="64px"
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        bg={isActive ? bg : 'inherit'}
        color={useColorModeValue('inherit', 'gray.400')}
        _hover={{
          bg,
          color: useColorModeValue('gray.900', 'gray.200'),
        }}
      >
        {icon && (
          <Icon
            mx="2"
            boxSize="4"
            _groupHover={{
              color,
            }}
            as={icon}
            transition="300ms ease transform"
            transform={isActive ? 'scale(1.5)' : 'scale(1)'}
          />
        )}
        <Text display={{ base: drawer ? 'unset' : 'none', md: 'unset' }}>
          {label}
        </Text>
      </Flex>
    </Link>
  );
}
