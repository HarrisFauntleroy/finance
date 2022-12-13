"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swyftxBalance = void 0;
const _1 = require(".");
const assets_1 = require("./assets");
const jwt_1 = require("./jwt");
const baseUrl = "/user/balance/";
/** Current balance & staking balance from Swyftx */
const swyftxBalance = (accessToken) => (0, _1.fetchFromSwyftx)(baseUrl, accessToken);
exports.swyftxBalance = swyftxBalance;
/**
 * @swagger
 * /api/swyftx/balance:
 *   get:
 *     description: Returns Swyftx balance
 *     responses:
 *       200:
 *         description: all balances related to an account
 */
const balance = async (_req, res) => {
    // Get access token for Swyftx API
    const { accessToken } = await (0, jwt_1.refreshSwyftxToken)(String(process.env.SWYFTX_API_KEY));
    // Assets list from Swyftx
    const assetsList = await (0, assets_1.swyftxAssets)(accessToken);
    // User balance from Swyftx
    const rawBalance = await (0, _1.fetchFromSwyftx)(baseUrl, accessToken).catch(console.error);
    // Swyftx returns assets with an ID, so we have to match the assetId to its respective asset from the assetsList
    const balanceComplete = rawBalance.map((item) => {
        // Find the matching asset in the assets list
        const matchingAsset = assetsList.find((asset) => Number(asset.id) === Number(item.assetId));
        // If a matching asset is found, add the display name and market ID to the balance item
        if (matchingAsset) {
            return {
                ...item,
                displayName: matchingAsset.name,
                marketId: matchingAsset.code,
            };
        }
        // If no matching asset is found, return the original balance item
        return item;
    });
    res.json(balanceComplete);
};
exports.default = balance;
