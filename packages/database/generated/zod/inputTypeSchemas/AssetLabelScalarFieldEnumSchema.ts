import { z } from 'zod';

export const AssetLabelScalarFieldEnumSchema = z.enum(['id','name','icon','createdAt','updatedAt','deleted','deletedAt','assetId']);

export default AssetLabelScalarFieldEnumSchema;
