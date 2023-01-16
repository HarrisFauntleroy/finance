import React from "react"

import { HeaderMenuDesktop, HeaderMenuMobile } from "./HeaderMenu"
import type { UseDisclosureProps } from "@chakra-ui/react"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Divider,
	Flex,
	IconButton,
	useBreakpointValue,
	useColorModeValue,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { FiMenu } from "react-icons/fi"

type HeaderProps = UseDisclosureProps

export default function Header({ onOpen }: HeaderProps) {
	const location = useRouter()

	/** Remove query params from pathname */
	const pathName = location?.asPath.split("?")[0]
	/**
	 * Splits path into an array of elements
	 * removing empty spaces and # symbols in the process
	 */
	const pathArray = pathName?.replace(/#/g, "")?.split("/").filter(Boolean)

	const desktop = useBreakpointValue({ base: false, sm: true })

	return (
		<>
			{/* // THE ERROR IS ALL HERE  */}
			<Flex
				as="header"
				align="center"
				justify={{ base: "space-between" }}
				w="full"
				px="4"
				pl={{ base: "16px", md: "64px", lg: "200px" }}
				bg={useColorModeValue("gray.50", "gray.900")}
				boxShadow="sm"
				height="64px"
			>
				<Breadcrumb
					aria-label="breadcrumb"
					separator={<Flex>/</Flex>}
					textTransform="uppercase"
					style={{ margin: "8px" }}
					overflow="scroll"
				>
					<BreadcrumbItem isCurrentPage={pathName === "/"}>
						<BreadcrumbLink href="/">Home</BreadcrumbLink>
					</BreadcrumbItem>
					{pathArray?.map((path, index) => (
						<BreadcrumbItem
							key={`breadcrumbs${index}`}
							isCurrentPage={pathName?.replace("/", "") === path}
						>
							<BreadcrumbLink href={`/${path}`}>{path}</BreadcrumbLink>
						</BreadcrumbItem>
					))}
				</Breadcrumb>
				<Flex gap={2}>
					<IconButton
						aria-label="Menu"
						display={{ base: "flex", md: "none" }}
						onClick={onOpen}
						icon={<FiMenu />}
						size="sm"
					/>
					{desktop ? <HeaderMenuDesktop /> : <HeaderMenuMobile />}
				</Flex>
			</Flex>
			<Divider />
		</>
	)
}
