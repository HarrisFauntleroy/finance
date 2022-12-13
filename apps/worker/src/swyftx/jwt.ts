import { NextApiRequest, NextApiResponse } from "next";
import { GetSessionParams } from "next-auth/react";

export interface SwyftxJWT {
  accessToken: string;
  scope: string;
}

const baseUrl = "https://api.swyftx.com.au/auth/refresh/";

/** Fetch auth JWT for Swyftx API access */
export const refreshSwyftxToken = (apiKey: string): Promise<SwyftxJWT> => {
  const myHeaders = new Headers();

  const urlencoded = new URLSearchParams();
  urlencoded.append("apiKey", apiKey);

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  return fetch(baseUrl, requestOptions)
    .then((response) => response.json())
    .then((authToken) => authToken)
    .catch(console.error);
};

/**
 * @swagger
 * /api/swyftx/jwt:
 *   get:
 *     description: Returns a JWT for Sywftx
 *     responses:
 *       200:
 *         description: JWT from supplied API key
 */
const jwt = async (
  _req: NextApiRequest & GetSessionParams,
  res: NextApiResponse<SwyftxJWT>
) =>
  refreshSwyftxToken(String(process.env.SWYFTX_API_KEY))
    .then(res.json)
    .catch(console.error);

export default jwt;
