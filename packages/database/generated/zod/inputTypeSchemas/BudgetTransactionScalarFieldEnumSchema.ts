import { z } from 'zod';

export const BudgetTransactionScalarFieldEnumSchema = z.enum(['id','timestamp','pricePerUnit','baseCurrency','quantity','quantityFilled','fee','valueInBaseCurrency','fromAsset','toAsset','market','transactionType','expiry','status','transactionHash','description','memo','imageUrl','imageName','imageId','budgetEnvelopeId','userId','createdAt','updatedAt','deleted','deletedAt']);

export default BudgetTransactionScalarFieldEnumSchema;
