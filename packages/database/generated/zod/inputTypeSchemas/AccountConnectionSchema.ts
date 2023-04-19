import { z } from 'zod';

export const AccountConnectionSchema = z.enum(['NONE','SWYFTX','COINSPOT']);

export type AccountConnectionType = `${z.infer<typeof AccountConnectionSchema>}`

export default AccountConnectionSchema;
