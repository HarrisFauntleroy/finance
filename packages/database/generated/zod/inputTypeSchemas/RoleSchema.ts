import { z } from 'zod';

export const RoleSchema = z.enum(['GUEST','USER','ADMIN']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

export default RoleSchema;
