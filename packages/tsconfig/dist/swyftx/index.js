"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swyftx = void 0;
const util_1 = require("../util");
const axios_1 = __importDefault(require("axios"));
const common_1 = require("common");
const database_1 = require("database");
const prisma_client_1 = require("database/generated/prisma-client");
const baseSwyftxApiUrl = "https://api.swyftx.com.au";
const assetsUrl = "/markets/assets/";
const balanceUrl = "/user/balance/";
const historyUrl = "/history/all/type/assetId/";
const jwtUrl = "https://api.swyftx.com.au/auth/refresh/";
const swyftxAssets = (accessToken) => fetchFromSwyftx(assetsUrl, accessToken);
/** Current balance & staking balance from Swyftx */
const swyftxBalance = (accessToken) => fetchFromSwyftx(balanceUrl, accessToken);
const refreshSwyftxToken = async (apiKey) => {
    try {
        const myHeaders = {
            "Content-Type": "application/x-www-form-urlencoded",
        };
        const data = `apiKey=${apiKey}`;
        const response = await axios_1.default.post(jwtUrl, data, { headers: myHeaders });
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};
const body = JSON.stringify({ apiKey: process.env.SWYFTX_API_KEY });
const fetchFromSwyftx = async (url, accessToken) => {
    try {
        const response = await axios_1.default.get(baseSwyftxApiUrl + url, {
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
const swyftxHistory = (accessToken) => fetchFromSwyftx(historyUrl, accessToken);
const getSwyftxAccount = async ({ id, apiKey, }) => {
    const { accessToken } = await refreshSwyftxToken(String(apiKey));
    const assetsList = await swyftxAssets(accessToken);
    const rawBalance = await swyftxBalance(accessToken);
    const transactions = await swyftxHistory(accessToken);
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
const swyftx = async () => {
    const updateOneUser = async (secrets) => {
        common_1.logger.info(`Updating ${secrets.userId}`);
        const accounts = await getSwyftxAccount(secrets);
        const formattedData = accounts?.balance.map(({ name, availableBalance, stakingBalance, marketId, }) => {
            return {
                userId: secrets.userId,
                displayName: name,
                parentId: secrets?.id,
                marketId: marketId.toLowerCase(),
                interestBearingBalance: (0, util_1.toDecimal)(stakingBalance),
                balance: (0, util_1.toDecimal)(availableBalance),
                costBasis: (0, util_1.toDecimal)(0),
                targetBalance: (0, util_1.toDecimal)(0),
                rateOfIncome: (0, util_1.toDecimal)(0),
                realisedGain: (0, util_1.toDecimal)(0),
                apiKey: "",
                apiSecret: "",
                walletAddress: "",
                accountConnection: "NONE",
            };
        });
        const { Children } = await database_1.prisma.cryptocurrency.findFirstOrThrow({
            where: {
                userId: secrets.userId,
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
        formattedData?.map(async (crypto) => {
            const existingCrypto = Children.find((child) => child.marketId === crypto.marketId);
            if (existingCrypto?.id)
                database_1.prisma.cryptocurrency
                    .update({
                    where: { id: existingCrypto?.id },
                    data: crypto,
                })
                    .catch(common_1.logger.error);
            else
                database_1.prisma.cryptocurrency
                    .create({
                    data: crypto,
                })
                    .catch(common_1.logger.error);
        });
    };
    await database_1.prisma.cryptocurrency
        .findMany({
        where: { accountConnection: prisma_client_1.AccountConnection.SWYFTX },
        select: { apiKey: true, apiSecret: true, id: true, userId: true },
    })
        .then((secrets) => secrets.map((secret) => updateOneUser(secret)));
    return `Swyftx: ${new Date()}`;
};
exports.swyftx = swyftx;
