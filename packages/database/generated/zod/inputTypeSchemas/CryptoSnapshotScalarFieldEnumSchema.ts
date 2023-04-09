import { z } from 'zod';

export const CryptoSnapshotScalarFieldEnumSchema = z.enum(['id','currency','totalValue','costBasis','unrealisedGain','realisedGain','saleableValue','userId','createdAt','updatedAt','deleted','deletedAt']);

export default CryptoSnapshotScalarFieldEnumSchema;
