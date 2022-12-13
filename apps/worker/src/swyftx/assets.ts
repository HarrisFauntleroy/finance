import { NextApiRequest, NextApiResponse } from "next";
import { GetSessionParams } from "next-auth/react";
import { fetchFromSwyftx } from ".";
import { refreshSwyftxToken } from "./jwt";

const baseUrl = "/markets/assets/";

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
export const swyftxAssets = (accessToken: string) =>
  fetchFromSwyftx(baseUrl, accessToken);

/**
 * @swagger
 * /api/swyftx/assets:
 *   get:
 *     description: Returns all assets listed on Swyftx
 *     responses:
 *       200:
 *         description: all assets related to Syftx
 */
const assets = async (
  _req: NextApiRequest & GetSessionParams,
  res: NextApiResponse<SwyftxAsset[]>
) =>
  refreshSwyftxToken(String(process.env.SWYFTX_API_KEY))
    .then(({ accessToken }) =>
      swyftxAssets(accessToken).then(res.json).catch(res.json)
    )
    .catch(res.json);

export default assets;
