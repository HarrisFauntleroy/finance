import { useCallback, useState } from "react"

import { Box, Grid } from "@chakra-ui/react"
import Editor from "components/Notes/Editor"
import Preview from "components/Notes/Preview"
import type { NextPage } from "next"
import Head from "next/head"

const Home: NextPage = () => {
	const [doc, setDoc] = useState<string>("# Hello, World!\n\n")
	const handleDocChange = useCallback((newDoc: string) => {
		setDoc(newDoc)
	}, [])

	return (
		<Box
			style={{
				height: "100%",
			}}
		>
			<Head>
				<title>Markdown Editor</title>
				<meta
					name="description"
					content="Write notes in markdown syntax to level up your productivity."
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Box
				style={{
					height: "100%",
				}}
			>
				<Grid
					height="100%"
					width="100%"
					gridAutoFlow="dense"
					templateAreas={{
						base: `"editor preview"`,
					}}
					gridTemplateRows={{
						base: "1fr",
					}}
					gridTemplateColumns={{
						base: "1fr 1fr",
					}}
				>
					<Editor initialDoc={doc} onChange={handleDocChange} />
					<Preview doc={doc} />
				</Grid>
			</Box>
		</Box>
	)
}

export default Home
