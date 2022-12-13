"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSwyftxAccount = exports.getApiKeyAndSecret = exports.fetchFromSwyftx = void 0;
const assets_1 = require("./assets");
const balance_1 = require("./balance");
const history_1 = require("./history");
const jwt_1 = require("./jwt");
const axios_1 = __importDefault(require("axios"));
const database_1 = require("database");
const prisma_client_1 = require("database/generated/prisma-client");
const runtime_1 = require("database/generated/prisma-client/runtime");
// import logger from "common/dist/src/helpers/logger"
const baseUrl = "https://api.swyftx.com.au";
const body = JSON.stringify({ apiKey: process.env.SWYFTX_API_KEY });
/** Default GET request for Swyftx API, adds authorisation */
const fetchFromSwyftx = async (url, accessToken) => {
    try {
        const response = await axios_1.default.get(baseUrl + url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            data: body,
        });
        return response.data;
    }
    catch (err) {
        // You could log the error message here
        console.error(err);
    }
};
exports.fetchFromSwyftx = fetchFromSwyftx;
const getApiKeyAndSecret = async (userId) => database_1.prisma.cryptocurrency.findFirstOrThrow({
    where: {
        userId: userId,
        accountConnection: prisma_client_1.AccountConnection.SWYFTX,
    },
    select: {
        id: true,
        apiKey: true,
        apiSecret: true,
    },
});
exports.getApiKeyAndSecret = getApiKeyAndSecret;
/** Get complete Swyftx account including balances & transaction history */
const getSwyftxAccount = async ({ id, apiKey }) => {
    // Get JWT for Swyftx API
    const { accessToken } = await (0, jwt_1.refreshSwyftxToken)(String(apiKey));
    // Swyftx assets list with IDs
    const assetsList = await (0, assets_1.swyftxAssets)(accessToken);
    // Current balance & staking balance from Swyftx
    const rawBalance = await (0, balance_1.swyftxBalance)(accessToken);
    // Transaction history from Swyftx
    const transactions = await (0, history_1.swyftxHistory)(accessToken);
    const balance = rawBalance?.map((item) => {
        const matchingAsset = assetsList.find((asset) => Number(asset.id) === Number(item.assetId));
        if (matchingAsset) {
            return {
                ...item,
                name: matchingAsset.name,
                marketId: matchingAsset.code,
            };
        }
        return item;
    });
    const history = transactions?.map((item) => {
        const matchingAsset = assetsList.find((asset) => Number(asset.id) === Number(item.asset));
        if (matchingAsset) {
            return {
                ...item,
                name: matchingAsset.name,
                marketId: matchingAsset.code,
            };
        }
        return item;
    });
    return {
        id,
        balance,
        history,
    };
};
exports.getSwyftxAccount = getSwyftxAccount;
const swyftx = async () => {
    const userIDs = await database_1.prisma.user.findMany({ select: { id: true } });
    const userIds = userIDs.map(({ id: userId }) => userId);
    const doSwyftx = async (userId) => {
        // First look for any connected swyftx accounts
        const secrets = await (0, exports.getApiKeyAndSecret)(userId);
        // Get balances and history for those accounts
        const accounts = await (0, exports.getSwyftxAccount)(secrets);
        // Format Swyftx response to fix schema
        const formattedData = accounts?.balance.map(({ name, availableBalance, stakingBalance, marketId,
        // TODO: add currency to this??? what?
         }) => {
            return {
                userId,
                displayName: name,
                parentId: secrets?.id,
                marketId: marketId.toLowerCase(),
                interestBearingBalance: new runtime_1.Decimal(stakingBalance),
                balance: new runtime_1.Decimal(availableBalance).toDecimalPlaces(10),
                costBasis: new runtime_1.Decimal(0),
                targetBalance: new runtime_1.Decimal(0),
                rateOfIncome: new runtime_1.Decimal(0),
                realisedGain: new runtime_1.Decimal(0),
                apiKey: "",
                apiSecret: "",
                walletAddress: "",
                accountConnection: "NONE",
            };
        });
        // Update the swyftx connected accounts children accounts
        const { Children } = await database_1.prisma.cryptocurrency.findFirstOrThrow({
            where: {
                userId,
                accountConnection: prisma_client_1.AccountConnection.SWYFTX,
            },
            select: {
                id: true,
                Children: {
                    select: {
                        id: true,
                        marketId: true,
                    },
                },
            },
        });
        formattedData?.map(async (data) => {
            // Check if a crypto of this kind already exists
            const existingCrypto = Children.find((child) => child.marketId === data.marketId);
            try {
                await database_1.prisma.cryptocurrency.upsert({
                    where: { id: existingCrypto?.id },
                    // Update the existing crypto
                    update: data,
                    // Create if doesn't exist
                    create: data,
                });
                // logger.info(data.marketId, data.balance)
            }
            catch (error) {
                // logger.error(error)
            }
        });
    };
    userIds.map((userId) => doSwyftx(userId));
};
exports.default = swyftx;
