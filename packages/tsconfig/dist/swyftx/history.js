"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swyftxHistory = void 0;
const _1 = require(".");
const assets_1 = require("./assets");
const jwt_1 = require("./jwt");
const baseUrl = "/history/all/type/assetId/";
/** Current balance & staking balance from Swyftx */
const swyftxHistory = (accessToken) => (0, _1.fetchFromSwyftx)(baseUrl, accessToken);
exports.swyftxHistory = swyftxHistory;
/**
 * @swagger
 * /api/swyftx/history:
 *   get:
 *     description: Returns Swyftx history for current signed in user
 *     responses:
 *       200:
 *         description: all transactions related to an account
 */
const history = async (_req, res) => {
    // Get access token for Swyftx API
    const { accessToken } = await (0, jwt_1.refreshSwyftxToken)(String(process.env.SWYFTX_API_KEY));
    // Assets list from Swyftx
    const assetsList = await (0, assets_1.swyftxAssets)(accessToken);
    // User history from Swyftx
    const rawHistory = await (0, _1.fetchFromSwyftx)(baseUrl, accessToken).catch(console.error);
    // Map over each item in the raw history array and add some properties to each item
    const historyComplete = rawHistory.map((item) => {
        // Find the matching asset in the assets list
        const matchingAsset = assetsList.find((asset) => asset.id === item.asset);
        // If a matching asset was found
        if (matchingAsset) {
            // Add the displayName and marketId properties to the item
            return {
                ...item,
                displayName: matchingAsset.name,
                marketId: matchingAsset.code,
            };
        }
        // If no matching asset was found, return the original item
        return item;
    });
    res.json(historyComplete);
};
exports.default = history;
