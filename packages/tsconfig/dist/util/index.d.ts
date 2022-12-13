import { Decimal } from "database/generated/prisma-client/runtime";
import { z } from "zod";
export declare const toDecimal: (value: number | string | Decimal) => Decimal;
export declare const decimal: () => z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodUnion<[z.ZodType<Decimal, z.ZodTypeDef, Decimal>, z.ZodString]>, z.ZodNumber]>, string | number | Decimal, string | number | Decimal>, Decimal, string | number | Decimal>;
//# sourceMappingURL=index.d.ts.map