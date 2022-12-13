import { NextApiRequest, NextApiResponse } from "next";
import { GetSessionParams } from "next-auth/react";

export interface Transaction {
  amount: number;
  trigger: number;
  quantity: number;
  primaryAsset: number;
  quantityAsset: number;
  asset: string;
  updated: Date;
  actionType: string;
  status: string;
}
/** Current balance & staking balance from Swyftx */
export declare const swyftxHistory: (accessToken: string) => Promise<any>;
/**
 * @swagger
 * /api/swyftx/history:
 *   get:
 *     description: Returns Swyftx history for current signed in user
 *     responses:
 *       200:
 *         description: all transactions related to an account
 */
declare const history: (
  _req: NextApiRequest & GetSessionParams,
  res: NextApiResponse<Transaction[]>
) => Promise<void>;
export default history;
//# sourceMappingURL=history.d.ts.map
