import { z } from 'zod';

export const AssetTransactionScalarFieldEnumSchema = z.enum(['id','timestamp','pricePerUnit','baseCurrency','quantity','quantityFilled','fee','valueInBaseCurrency','fromAsset','toAsset','market','transactionType','expiry','status','transactionHash','description','memo','relatedAssetId','userId','createdAt','updatedAt','deleted','deletedAt']);

export default AssetTransactionScalarFieldEnumSchema;
