"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateUserTotals = void 0;
const server_1 = require("@trpc/server");
const common_1 = require("common");
const database_1 = require("database");
const prisma_client_1 = require("database/generated/prisma-client");
const runtime_1 = require("database/generated/prisma-client/runtime");
const calculateUserTotals = async (userId) => {
    const user = await database_1.prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            cryptocurrency: {
                include: {
                    market: true,
                    Children: true,
                },
            },
        },
    });
    const settings = await database_1.prisma.settings.findFirstOrThrow({
        where: {
            userId,
        },
    });
    const userCurrency = settings.userCurrency;
    const exchangeRates = await database_1.prisma.market.findMany({
        where: {
            type: prisma_client_1.MarketType.CASH,
        },
        select: {
            currency: true,
            price: true,
            name: true,
            ticker: true,
        },
    });
    /** Convert array to object */
    const fx = exchangeRates.reduce((acc, val) => ({
        ...acc,
        [val.ticker]: val.price,
    }), {});
    if (!user) {
        throw new server_1.TRPCError({
            code: "NOT_FOUND",
            message: `No user with userId '${userId}'`,
        });
    }
    /** Calculate cryptocurrency for overview */
    const cryptocurrency = (0, common_1.calculateManyCrypto)({
        data: user?.cryptocurrency,
        exchangeRates: fx,
        userCurrency,
    });
    const { totalValue, totalCostBasis, unrealisedGain, saleableValue } = (0, common_1.calculateCryptoOverview)({ data: cryptocurrency });
    return {
        currency: userCurrency,
        totalValue: totalValue.toString(),
        costBasis: totalCostBasis.toString(),
        unrealisedGain: unrealisedGain.toString(),
        realisedGain: "0",
        saleableValue: saleableValue.toString(),
    };
};
exports.calculateUserTotals = calculateUserTotals;
/**
 * @swagger
 * /api/accountsHistory:
 *   get:
 *     description: Creates new accountsHistory entry
 *     responses:
 *       200:
 *         description: all transactions related to an account
 */
const accountsHistory = async (req, res) => {
    /** Get userId of signed in user */
    const users = await database_1.prisma.user.findMany({
        select: {
            id: true,
        },
    });
    const results = [];
    await Promise.all(users.map(async ({ id: userId }) => {
        try {
            /** Calculate overview totals to store for history */
            const totals = await (0, exports.calculateUserTotals)(userId);
            /** Create new accountsHistory entry */
            const response = await database_1.prisma.accountsHistory.create({
                data: {
                    userId,
                    currency: totals.currency,
                    costBasis: new runtime_1.Decimal(totals.costBasis),
                    totalValue: new runtime_1.Decimal(totals.totalValue),
                    realisedGain: new runtime_1.Decimal(totals.realisedGain),
                    saleableValue: new runtime_1.Decimal(totals.saleableValue),
                    unrealisedGain: new runtime_1.Decimal(totals.unrealisedGain),
                },
                select: {
                    id: true,
                    userId: true,
                    totalValue: true,
                    costBasis: true,
                    unrealisedGain: true,
                    realisedGain: true,
                    saleableValue: true,
                    createdAt: true,
                },
            });
            /** Return AccountsHistory object */
            results.push({ user: response.userId, status: "Succeeded" });
        }
        catch (error) {
            /** Return the thrown error */
            results.push({ status: "Failed" });
        }
    }));
    res.json({ results: results });
};
exports.default = accountsHistory;
