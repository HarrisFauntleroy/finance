import { z } from 'zod';

export const SettingsScalarFieldEnumSchema = z.enum(['id','userId','preferredColorScheme','userCurrency','userLanguage','createdAt','updatedAt','deleted','deletedAt']);

export default SettingsScalarFieldEnumSchema;
