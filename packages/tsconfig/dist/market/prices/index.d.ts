import type { NextApiRequest, NextApiResponse } from "next";
import type { GetSessionParams } from "next-auth/react";
declare type CoinGeckoStatus = {
    status: number;
};
export declare const updateMarketsCrypto: () => Promise<void>;
/**
 * @swagger
 * /api/market/prices:
 *   get:
 *     description: Updates all markets
 *     responses:
 *       200:
 *         description: example
 */
declare const prices: (_request: NextApiRequest & GetSessionParams, res: NextApiResponse<CoinGeckoStatus>) => Promise<void>;
export default prices;
//# sourceMappingURL=index.d.ts.map