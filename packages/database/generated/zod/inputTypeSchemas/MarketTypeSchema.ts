import { z } from 'zod';

export const MarketTypeSchema = z.enum(['CRYPTOCURRENCY','STOCK','ETF','METAL','OTHER','CASH']);

export type MarketTypeType = `${z.infer<typeof MarketTypeSchema>}`

export default MarketTypeSchema;
