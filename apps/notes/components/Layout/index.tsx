/**
 *
 * Default layout
 * Style: Golden Ratio
 *
 */
import type { ReactNode } from "react"
import { useState } from "react"
import React from "react"

import { NoteForm } from "../Form"
import { HamburgerIcon, PlusSquareIcon } from "@chakra-ui/icons"
import {
	Avatar,
	Box,
	Button,
	Divider,
	Flex,
	Grid,
	GridItem,
	IconButton,
	Stack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react"
import type { Note } from "database-notes/generated/prisma-client"
import { signIn, signOut, useSession } from "next-auth/react"
import { MdLogin, MdLogout } from "react-icons/md"
import { MarkdownEditor } from "ui"
import { trpc } from "~/utils/trpc"

export default function Layout({ children }: { children?: ReactNode }) {
	const [currentNote, setCurrentNote] = useState<Note>()
	const session = useSession()
	const userId = session.data?.userId

	const { data } = trpc.notes.byUserId.useQuery({ authorId: userId })
	const { data: noteById } = trpc.notes.byId.useQuery({
		id: currentNote?.id,
	})

	const handleSelectNote = (noteId: Note) => setCurrentNote(noteId)

	return (
		<Grid
			maxWidth="100vw"
			minHeight="100vh"
			templateAreas={{
				md: `"control editor viewer"`,
				sm: `"control control"
						 "editor viewer"`,
				base: `"control"
							 "editor"
							 "viewer"`,
			}}
			gridTemplateRows={{
				md: "minmax(0, 1fr)",
				sm: "1cm minmax(0, 1fr)",
				base: "1cm repeat(2, max-content)",
			}}
			gridTemplateColumns={{
				md: "repeat(3, minmax(0, 1fr))",
				sm: "repeat(2, minmax(0, 1fr))",
				base: "minmax(0, 1fr)",
			}}
			gap="1px"
			bg={useColorModeValue("background.light", "background.dark")}
			color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}
		>
			<GridItem area={"control"}>
				<Flex
					flexDirection={{ md: "column", base: "row" }}
					style={{
						padding: "8px",
						background: "#FEFCBF",
						flex: 1,
						width: "100%",
						height: "100%",
					}}
					alignItems={{ md: "left", base: "center" }}
					justifyContent={{ md: "flex-start", base: "space-between" }}
				>
					<IconButton
						display={{ md: "none" }}
						variant="ghost"
						icon={<HamburgerIcon />}
						aria-label={""}
					/>
					<IconButton
						variant="ghost"
						icon={<PlusSquareIcon />}
						aria-label={""}
					/>
					{session.status === "authenticated" ? (
						<Button
							leftIcon={<MdLogout />}
							onClick={() => signOut({ callbackUrl: "/" })}
						>
							Log out
						</Button>
					) : (
						<Button leftIcon={<MdLogin />} onClick={async () => signIn()}>
							Log in
						</Button>
					)}
					<Flex style={{ alignItems: "center", gap: "8px" }}>
						<Avatar
							referrerPolicy="no-referrer"
							src={session.data?.user?.image || ""}
							size="sm"
							name={session.data?.user?.name || "User"}
							cursor="pointer"
						/>
						<Text display={{ md: "inherit", base: "none" }}>
							{session.data?.user.name}
						</Text>
					</Flex>
					<Divider marginY="8px" display={{ md: "inherit", base: "none" }} />
					<Stack display={{ md: "inherit", base: "none" }}>
						{data?.map((note) => (
							<Button
								key={note.id}
								onClick={() => handleSelectNote(note)}
								variant="link"
							>
								{note.title}
							</Button>
						))}
					</Stack>
				</Flex>
			</GridItem>
			<GridItem area={"editor"}>
				<Flex
					style={{
						background: "#FEFCBF",
						flex: 1,
						width: "100%",
						height: "100%",
					}}
				>
					<NoteForm noteId={noteById?.id} />
				</Flex>
				x
			</GridItem>
			<GridItem area={"viewer"}>
				<Flex
					style={{
						padding: "8px",
						background: "#FEFCBF",
						flex: 1,
						width: "100%",
						height: "100%",
					}}
				>
					<Box style={{ maxHeight: "100%", maxWidth: "100%" }}>
						<MarkdownEditor markdown={noteById?.body} />
					</Box>
				</Flex>
			</GridItem>
		</Grid>
	)
}
