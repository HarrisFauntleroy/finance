import type { NextApiRequest, NextApiResponse } from "next";

const authorized = (request: NextApiRequest): boolean => {
  const { authorization } = request.headers;

  return (
    request.method === "POST" &&
    authorization === `Bearer ${process.env.INTERNAL_API_KEY}`
  );
};

export default async function handler(
  request: NextApiRequest,
  res: NextApiResponse
) {
  const isAuthorized = authorized(request);
  if (isAuthorized) {
    res.status(200).json({ statusCode: 200, message: "Success" });
  } else {
    res.status(500).json({ statusCode: 500, message: "Failure" });
  }
}
