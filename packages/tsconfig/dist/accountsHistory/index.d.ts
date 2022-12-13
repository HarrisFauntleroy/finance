import { AccountsHistory } from "database/generated/prisma-client";
import { NextApiRequest, NextApiResponse } from "next";
import { GetSessionParams } from "next-auth/react";
export declare const calculateUserTotals: (userId: string) => Promise<{
    currency: string;
    totalValue: string;
    costBasis: string;
    unrealisedGain: string;
    realisedGain: string;
    saleableValue: string;
}>;
/**
 * @swagger
 * /api/accountsHistory:
 *   get:
 *     description: Creates new accountsHistory entry
 *     responses:
 *       200:
 *         description: all transactions related to an account
 */
declare const accountsHistory: (req: NextApiRequest & GetSessionParams, res: NextApiResponse<AccountsHistory | {
    results: {
        user?: string;
        status: string;
    }[];
}>) => Promise<void>;
export default accountsHistory;
//# sourceMappingURL=index.d.ts.map