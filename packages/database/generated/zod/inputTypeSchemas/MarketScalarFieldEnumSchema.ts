import { z } from 'zod';

export const MarketScalarFieldEnumSchema = z.enum(['id','name','ticker','description','currency','price','priceChange24h','priceChange24hPercent','marketCap','marketCapRank','type','image','createdAt','updatedAt','deleted','deletedAt']);

export default MarketScalarFieldEnumSchema;
