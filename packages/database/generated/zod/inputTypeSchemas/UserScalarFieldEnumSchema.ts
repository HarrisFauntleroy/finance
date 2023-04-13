import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'email',
  'emailVerified',
  'image',
  'createdAt',
  'updatedAt',
  'deleted',
  'deletedAt',
  'role',
]);

export default UserScalarFieldEnumSchema;
