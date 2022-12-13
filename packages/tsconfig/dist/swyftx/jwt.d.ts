import { NextApiRequest, NextApiResponse } from "next";
import { GetSessionParams } from "next-auth/react";
export interface SwyftxJWT {
    accessToken: string;
    scope: string;
}
/** Fetch auth JWT for Swyftx API access */
export declare const refreshSwyftxToken: (apiKey: string) => Promise<SwyftxJWT>;
/**
 * @swagger
 * /api/swyftx/jwt:
 *   get:
 *     description: Returns a JWT for Sywftx
 *     responses:
 *       200:
 *         description: JWT from supplied API key
 */
declare const jwt: (_req: NextApiRequest & GetSessionParams, res: NextApiResponse<SwyftxJWT>) => Promise<void>;
export default jwt;
//# sourceMappingURL=jwt.d.ts.map