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
declare const accountsHistory: () => Promise<void>;
export default accountsHistory;
//# sourceMappingURL=index.d.ts.map