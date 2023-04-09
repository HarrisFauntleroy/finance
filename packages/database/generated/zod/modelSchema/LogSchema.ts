import { z } from 'zod';
import { LogTypeSchema } from '../inputTypeSchemas/LogTypeSchema'

/////////////////////////////////////////
// LOG SCHEMA
/////////////////////////////////////////

export const LogSchema = z.object({
  type: LogTypeSchema,
  id: z.string().cuid(),
  message: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deleted: z.boolean(),
  deletedAt: z.coerce.date().nullable(),
})

export type Log = z.infer<typeof LogSchema>

export default LogSchema;
