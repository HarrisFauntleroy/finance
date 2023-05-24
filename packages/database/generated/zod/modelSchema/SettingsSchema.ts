import { z } from 'zod';
import { ColorSchemeSchema } from '../inputTypeSchemas/ColorSchemeSchema'

/////////////////////////////////////////
// SETTINGS SCHEMA
/////////////////////////////////////////

export const SettingsSchema = z.object({
  preferredColorScheme: ColorSchemeSchema.nullable(),
  id: z.string().cuid(),
  userId: z.string(),
  userCurrency: z.string(),
  userLanguage: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deleted: z.boolean(),
  deletedAt: z.coerce.date().nullable(),
})

export type Settings = z.infer<typeof SettingsSchema>

export default SettingsSchema;
