// Refactored code:
import type { NextApiRequest, NextApiResponse } from "next"

const authorized = (req: NextApiRequest): boolean => {
	const { authorization } = req.headers

	return (
		req.method === "POST" &&
		authorization === `Bearer ${process.env.INTERNAL_API_KEY}`
	)
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (authorized(req)) {
		res.json("YES")
	} else {
		res.json("NO")
	}
}
