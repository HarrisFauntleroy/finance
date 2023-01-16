import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		try {
			const { authorization } = req.headers

			console.log(authorization)
			console.log(`Bearer ${process.env.INTERNAL_API_KEY}`)

			if (authorization === `Bearer ${process.env.INTERNAL_API_KEY}`) {
				res.status(200).json({ success: true })
			} else {
				res.status(401).json({ success: false })
			}
		} catch (err) {
			res.status(500).json({ statusCode: 500, message: (err as Error).message })
		}
	} else {
		res.setHeader("Allow", "POST")
		res.status(405).end("Method Not Allowed")
	}
}