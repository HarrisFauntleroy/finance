import React from "react"

import NextError from "next/error"
import { useRouter } from "next/router"
import { Debug } from "~/components/Debug"
import Page from "~/components/Page"
import { trpc } from "~/utils/trpc"

function CryptocurrencyViewPage() {
	const id = useRouter().query.id as string
	const { data, error, status } = trpc.cryptocurrency.byId.useQuery({
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
			<h1>{data.displayName}</h1>
			<em>
				Created
				{data?.createdAt.toLocaleDateString("en-us")}
			</em>
			<h2>Raw data:</h2>
			{data && <Debug data={data} />}
		</Page>
	)
}

CryptocurrencyViewPage.auth = true
export default CryptocurrencyViewPage
