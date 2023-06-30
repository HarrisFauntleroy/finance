import { Decimal } from "database/generated/prisma-client/runtime/library";
import { z } from "zod";

// Returns a decimal to 10 decimal places
export const toDecimal = (value: number | string | Decimal) =>
  new Decimal(value || 0).toDecimalPlaces(10);

// Returns a zod-type decimal
export const decimal = () =>
  z
    .instanceof(Decimal)
    .or(z.string())
    .or(z.number())
    .refine((value) => {
      try {
        return toDecimal(value);
      } catch {
        return false;
      }
    })
    .transform((value) => toDecimal(value));
