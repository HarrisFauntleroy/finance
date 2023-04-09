import { z } from 'zod';

export const CryptocurrencyScalarFieldEnumSchema = z.enum(['id','displayName','currency','balance','costBasis','realisedGain','apiKey','apiSecret','walletAddress','targetBalance','interestBearingBalance','incomeRate','accountConnection','marketId','parentId','userId','createdAt','updatedAt','deleted','deletedAt']);

export default CryptocurrencyScalarFieldEnumSchema;
