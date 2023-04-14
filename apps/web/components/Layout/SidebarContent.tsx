import type { BoxProps } from '@chakra-ui/react';
import {
  Box,
  Center,
  Divider,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import type { SidebarLink } from 'components/Layout/Sidebar';
import { SidebarItem } from 'components/Layout/SidebarItem';
import Image from 'next/image';
import Link from 'next/link';

type SidebarContentProps = BoxProps & {
  links: SidebarLink[];
  drawer?: boolean;
};

export function SidebarContent({
  links,
  drawer,
  ...props
}: SidebarContentProps) {
  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="8"
      bg={useColorModeValue('gray.50', 'gray.900')}
      overflowX="hidden"
      overflowY="auto"
      shadow="2xl"
      w={{ base: 0, sm: '64px', lg: '200px' }}
      {...props}
    >
      <Link href="/">
        <Center
          height="64px"
          justifyContent={{
            base: drawer ? 'left' : 'center',
            sm: drawer ? 'left' : 'center',
          }}
        >
          <Image src="/images/logodark.png" height="32" width="32" alt="logo" />

          <Text
            ml="2"
            fontSize="2xl"
            fontWeight="semibold"
            display={{ sm: 'none', lg: 'unset' }}
          >
            Elixir Money
          </Text>
        </Center>
      </Link>

      <Divider />
      <Stack as="nav" aria-label="Main Navigation">
        {links?.map(({ href, icon, label, role }) => (
          <SidebarItem
            key={href}
            href={href}
            icon={icon}
            label={label}
            drawer={drawer}
            role={role}
          />
        ))}
      </Stack>
    </Box>
  );
}
