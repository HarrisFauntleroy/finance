import React from 'react';

import { HeaderMenuDesktop, HeaderMenuMobile } from './HeaderMenu';

import type { UseDisclosureProps } from '@chakra-ui/react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  Flex,
  IconButton,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FiMenu } from 'react-icons/fi';

type HeaderProps = UseDisclosureProps;

export default function Header({ onOpen }: HeaderProps) {
  const location = useRouter();

  /** Remove query params from pathname */
  const path = location?.asPath.split('?')[0];

  const formattedPath = path?.replace(/#/g, '')?.split('/').filter(Boolean);

  const desktop = useBreakpointValue({ base: false, sm: true });

  return (
    <>
      {/* // THE ERROR IS ALL HERE  */}
      <Flex
        as="header"
        align="center"
        justify={{ base: 'space-between' }}
        w="full"
        px="4"
        pl={{ base: '8px', sm: '64px', lg: '200px' }}
        boxShadow="sm"
        height="64px"
      >
        <Breadcrumb
          aria-label="breadcrumb"
          separator={<Flex>/</Flex>}
          textTransform="uppercase"
          style={{ margin: '8px' }}
          overflow="scroll"
        >
          <BreadcrumbItem isCurrentPage={path === '/'}>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          {formattedPath?.map((section) => (
            <BreadcrumbItem
              key={section}
              isCurrentPage={section?.replace('/', '') === section}
            >
              <BreadcrumbLink href={`/${section}`}>{section}</BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
        <Flex gap={2}>
          <IconButton
            aria-label="Menu"
            display={{ base: 'flex', sm: 'none' }}
            onClick={onOpen}
            icon={<FiMenu />}
            size="sm"
          />
          {desktop ? <HeaderMenuDesktop /> : <HeaderMenuMobile />}
        </Flex>
      </Flex>
      <Divider />
    </>
  );
}
