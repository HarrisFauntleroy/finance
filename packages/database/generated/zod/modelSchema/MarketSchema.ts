import { z } from 'zod';
import { MarketTypeSchema } from '../inputTypeSchemas/MarketTypeSchema'

/////////////////////////////////////////
// MARKET SCHEMA
/////////////////////////////////////////

export const MarketSchema = z.object({
  type: MarketTypeSchema,
  id: z.string().cuid(),
  name: z.string().nullable(),
  ticker: z.string(),
  description: z.string().nullable(),
  currency: z.string(),
  price: z.string().nullable(),
  priceChange24h: z.string().nullable(),
  priceChange24hPercent: z.string().nullable(),
  marketCap: z.string().nullable(),
  marketCapRank: z.string().nullable(),
  image: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deleted: z.boolean(),
  deletedAt: z.coerce.date().nullable(),
})

export type Market = z.infer<typeof MarketSchema>

export default MarketSchema;
