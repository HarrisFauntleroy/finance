import { NextApiRequest, NextApiResponse } from "next";
import { GetSessionParams } from "next-auth/react";
export interface SwyftxAsset {
    id: string;
    name: string;
    code: string;
    minimum_order: string;
    price_scale: number;
    deposit_enabled: boolean;
    withdraw_enabled: boolean;
    min_confirmations: number;
    min_withdrawal: number;
    minimum_order_increment: number;
    mining_fee: number;
    primary: boolean;
    secondary: boolean;
}
/** Current balance & staking balance from Swyftx */
export declare const swyftxAssets: (accessToken: string) => Promise<any>;
/**
 * @swagger
 * /api/swyftx/assets:
 *   get:
 *     description: Returns all assets listed on Swyftx
 *     responses:
 *       200:
 *         description: all assets related to Syftx
 */
declare const assets: (_req: NextApiRequest & GetSessionParams, res: NextApiResponse<SwyftxAsset[]>) => Promise<void>;
export default assets;
//# sourceMappingURL=assets.d.ts.map