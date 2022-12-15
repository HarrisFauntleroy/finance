import { NextApiRequest, NextApiResponse } from "next";
import { GetSessionParams } from "next-auth/react";
interface OpenExchangeRatesResponse {
    id: string;
    price: unknown;
    name: unknown;
}
export declare const fetchFromOpenExchangeRates: (url: string) => Promise<any>;
export declare const updateExchangeRates: () => Promise<OpenExchangeRatesResponse[]>;
/**
 * @swagger
 * /api/swyftx/exchangeRates:
 *   get:
 *     description: Returns the latest exchange rates from the Open Exchange Rates API
 *     responses:
 *       200:
 */
declare const exchangeRates: (_req: NextApiRequest & GetSessionParams, res: NextApiResponse<OpenExchangeRatesResponse[]>) => Promise<void>;
export default exchangeRates;
//# sourceMappingURL=index.d.ts.map