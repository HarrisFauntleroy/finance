import { z } from 'zod';

export const LogScalarFieldEnumSchema = z.enum(['id','type','message','createdAt','updatedAt','deleted','deletedAt']);

export default LogScalarFieldEnumSchema;
