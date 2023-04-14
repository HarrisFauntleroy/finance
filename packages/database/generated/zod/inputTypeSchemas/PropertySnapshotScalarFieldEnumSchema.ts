import { z } from 'zod';

export const PropertySnapshotScalarFieldEnumSchema = z.enum(['id','currency','totalValue','costBasis','unrealisedGain','realisedGain','saleableValue','userId','createdAt','updatedAt','deleted','deletedAt']);

export default PropertySnapshotScalarFieldEnumSchema;
