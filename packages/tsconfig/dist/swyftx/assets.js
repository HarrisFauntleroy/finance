"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swyftxAssets = void 0;
const _1 = require(".");
const jwt_1 = require("./jwt");
const baseUrl = "/markets/assets/";
/** Current balance & staking balance from Swyftx */
const swyftxAssets = (accessToken) => (0, _1.fetchFromSwyftx)(baseUrl, accessToken);
exports.swyftxAssets = swyftxAssets;
/**
 * @swagger
 * /api/swyftx/assets:
 *   get:
 *     description: Returns all assets listed on Swyftx
 *     responses:
 *       200:
 *         description: all assets related to Syftx
 */
const assets = async (_req, res) => (0, jwt_1.refreshSwyftxToken)(String(process.env.SWYFTX_API_KEY))
    .then(({ accessToken }) => (0, exports.swyftxAssets)(accessToken).then(res.json).catch(res.json))
    .catch(res.json);
exports.default = assets;
