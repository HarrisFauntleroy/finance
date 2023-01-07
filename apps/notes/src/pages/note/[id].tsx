import React from "react"

import NextError from "next/error"
import { useRouter } from "next/router"
import { Debug, Page } from "ui"
import { trpc } from "~/utils/trpc"

function NoteViewPage() {
	const id = useRouter().query.id as string
	const { data, error, status } = trpc.notes.byId.useQuery({
		id,
	})

	if (error) {
		return (
			<NextError
				title={error.message}
				statusCode={error.data?.httpStatus ?? 500}
			/>
		)
	}

	if (status !== "success") {
		return <>Loading...</>
	}

	return (
		<Page>
			{/* <h1>{data.title}</h1>
			<em>
				Created
				{data?.createdAt.toLocaleDateString("en-us")}
			</em>
			<h2>Raw data:</h2>
			{data && <Debug data={data} />} */}
		</Page>
	)
}

NoteViewPage.auth = true
export default NoteViewPage
