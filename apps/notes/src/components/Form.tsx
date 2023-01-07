import React, { useEffect } from "react"

import { logger } from "common"
import { useSession } from "next-auth/react"
import { FormProvider, useForm } from "react-hook-form"
import { Drawer, MarkdownEditor } from "ui"
import { RouterOutput, trpc } from "~/utils/trpc"
import { Note } from "database-notes/generated/prisma-client"
import { MdNote } from "react-icons/md"
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons"
import {
	useToast,
	useEditableControls,
	ButtonGroup,
	IconButton,
	Flex,
	Input,
	Editable,
	EditableInput,
	EditablePreview,
	Textarea,
	useDisclosure,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	DrawerHeader,
	DrawerBody,
	DrawerFooter,
	Button,
	useColorModeValue,
	Tooltip,
} from "@chakra-ui/react"
import { inferProcedureOutput, inferRouterOutputs } from "@trpc/server"

type DefaultNote = RouterOutput["notes"]["byId"]

interface NoteFormProps {
	noteId?: string
}

export const NoteForm = ({ noteId }: NoteFormProps) => {
	/** Session from next-auth */
	const session = useSession()
	/** userId */
	const userId = session.data?.userId
	/** Toast controls */
	const toast = useToast()

	const createNote = trpc.notes.create.useMutation()
	const updateNote = trpc.notes.update.useMutation()
	const { data: defaultValues } = trpc.notes.byId.useQuery({ id: noteId })

	const methods = useForm<DefaultNote>({
		defaultValues,
	})

	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = methods

	/** React hook form memoizes values by default, so when defaultValues changes we reset the form */
	useEffect(() => reset(defaultValues), [defaultValues, reset])

	const onFormSubmit = (data: DefaultNote) => {
		logger.info(data)
		if (data?.id && userId) {
			updateNote.mutateAsync({
				authorId: userId,
				id: data?.id,
				title: data.title,
				body: data.body,
			})
		}
		if (userId)
			createNote.mutateAsync({
				authorId: userId,
				title: data.title,
				body: data.body,
			})
	}

	/* Here's a custom control */
	function EditableControls() {
		const {
			isEditing,
			getSubmitButtonProps,
			getCancelButtonProps,
			getEditButtonProps,
		} = useEditableControls()

		return isEditing ? (
			<ButtonGroup justifyContent="center" size="sm">
				<IconButton
					aria-label=""
					icon={<CheckIcon />}
					{...getSubmitButtonProps()}
				/>
				<IconButton
					aria-label=""
					icon={<CloseIcon />}
					{...getCancelButtonProps()}
				/>
			</ButtonGroup>
		) : (
			<Flex justifyContent="center">
				<IconButton
					aria-label=""
					size="sm"
					icon={<EditIcon />}
					{...getEditButtonProps()}
				/>
			</Flex>
		)
	}

	return (
		<FormProvider {...methods}>
			<form id="notes-form" onSubmit={handleSubmit(onFormSubmit, logger.error)}>
				<button type="submit">Submit</button>
				<Input defaultValue={userId} hidden {...register("authorId")} />

				<Editable
					isPreviewFocusable={true}
					selectAllOnFocus={false}
					defaultValue={defaultValues?.title}
				>
					<Tooltip label="Click to edit">
						<EditablePreview
							py={2}
							px={4}
							_hover={{
								background: useColorModeValue("gray.100", "gray.700"),
							}}
						/>
					</Tooltip>
					<EditableControls />
					<Input py={2} px={4} as={EditableInput} {...register("title")} />
				</Editable>
				<Editable
					defaultValue={defaultValues?.body}
					isPreviewFocusable={true}
					selectAllOnFocus={false}
				>
					<Tooltip label="Click to edit">
						<EditablePreview
							py={2}
							px={4}
							_hover={{
								background: useColorModeValue("gray.100", "gray.700"),
							}}
						/>
					</Tooltip>
					<EditableControls />
					<Textarea py={2} px={4} as={EditableInput} {...register("body")} />
				</Editable>
			</form>
		</FormProvider>
	)
}

interface NoteDrawerProps {
	defaultValues?: Note
}

export const NoteDrawer = ({ defaultValues }: NoteDrawerProps) => {
	const { onClose, isOpen, onOpen } = useDisclosure()

	return (
		<>
			<IconButton
				size="sm"
				icon={<MdNote />}
				onClick={onOpen}
				textTransform="uppercase"
				maxWidth="max-content"
				aria-label={""}
			/>
			<Drawer isOpen={isOpen} onClose={onClose}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Update notes</DrawerHeader>
					<DrawerBody>
						<NoteForm noteId={defaultValues?.id} />
					</DrawerBody>
					<DrawerFooter borderTopWidth="1px">
						<ButtonGroup>
							<Button
								type="submit"
								form="notes-form"
								colorScheme="green"
								flex={1}
							>
								Save
							</Button>
							<Button flex={1} onClick={onClose} colorScheme="blue">
								Cancel
							</Button>
						</ButtonGroup>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	)
}
