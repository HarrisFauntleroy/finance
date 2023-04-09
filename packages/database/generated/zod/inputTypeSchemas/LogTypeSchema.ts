import { z } from 'zod';

export const LogTypeSchema = z.enum([
  'info',
  'warn',
  'error',
  'trace',
  'debug',
]);

export type LogTypeType = `${z.infer<typeof LogTypeSchema>}`;

export default LogTypeSchema;
