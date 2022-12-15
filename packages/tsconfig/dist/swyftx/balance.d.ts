import { NextApiRequest, NextApiResponse } from "next";
import { GetSessionParams } from "next-auth/react";
export interface Balance {
    assetId: number;
    name: string;
    availableBalance: string;
    stakingBalance: string;
    marketId: string;
}
/** Current balance & staking balance from Swyftx */
export declare const swyftxBalance: (accessToken: string) => Promise<any>;
/**
 * @swagger
 * /api/swyftx/balance:
 *   get:
 *     description: Returns Swyftx balance
 *     responses:
 *       200:
 *         description: all balances related to an account
 */
declare const balance: (_req: NextApiRequest & GetSessionParams, res: NextApiResponse<Balance[]>) => Promise<void>;
export default balance;
//# sourceMappingURL=balance.d.ts.map