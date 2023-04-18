import { z } from 'zod';

export const AssetStatusSchema = z.enum([
  'CONNECTED',
  'CONNECTION_FAILED',
  'DISCONNECTED',
  'PENDING_CONNECTION',
  'ERROR',
  'UNAUTHORIZED',
  'MAINTENANCE',
  'BLOCKED',
  'UNKNOWN',
  'ACTIVE',
  'INACTIVE',
]);

export type AssetStatusType = `${z.infer<typeof AssetStatusSchema>}`;

export default AssetStatusSchema;
