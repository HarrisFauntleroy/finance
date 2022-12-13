"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decimal = exports.toDecimal = void 0;
const runtime_1 = require("database/generated/prisma-client/runtime");
const zod_1 = require("zod");
// Returns a decimal to 10 decimal places
const toDecimal = (value) => new runtime_1.Decimal(value || 0).toDecimalPlaces(10);
exports.toDecimal = toDecimal;
// Returns a zod-type decimal
const decimal = () => zod_1.z
    .instanceof(runtime_1.Decimal)
    .or(zod_1.z.string())
    .or(zod_1.z.number())
    .refine((value) => {
    try {
        return (0, exports.toDecimal)(value);
    }
    catch (error) {
        return false;
    }
})
    .transform((value) => (0, exports.toDecimal)(value));
exports.decimal = decimal;
