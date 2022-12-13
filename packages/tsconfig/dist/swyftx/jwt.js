"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshSwyftxToken = void 0;
const baseUrl = "https://api.swyftx.com.au/auth/refresh/";
/** Fetch auth JWT for Swyftx API access */
const refreshSwyftxToken = (apiKey) => {
    const myHeaders = new Headers();
    const urlencoded = new URLSearchParams();
    urlencoded.append("apiKey", apiKey);
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
    };
    return fetch(baseUrl, requestOptions)
        .then((response) => response.json())
        .then((authToken) => authToken)
        .catch(console.error);
};
exports.refreshSwyftxToken = refreshSwyftxToken;
/**
 * @swagger
 * /api/swyftx/jwt:
 *   get:
 *     description: Returns a JWT for Sywftx
 *     responses:
 *       200:
 *         description: JWT from supplied API key
 */
const jwt = async (_req, res) => (0, exports.refreshSwyftxToken)(String(process.env.SWYFTX_API_KEY))
    .then(res.json)
    .catch(console.error);
exports.default = jwt;
