import type { NextApiRequest, NextApiResponse } from "next";

const authorized = (req: NextApiRequest): boolean => {
  const { authorization } = req.headers;

  return (
    req.method === "POST" &&
    authorization === `Bearer ${process.env.INTERNAL_API_KEY}`
  );
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const isAuthorized = authorized(req);
  if (isAuthorized) {
    res.status(200).json({ statusCode: 200, message: "Success" });
  } else {
    res.status(500).json({ statusCode: 500, message: "Failure" });
  }
}
