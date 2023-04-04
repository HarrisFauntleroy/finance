import { LogType, Prisma } from 'database/generated/prisma-client';

import { z } from 'zod';

export const LogSelectSchema = Prisma.validator<Prisma.LogSelect>()({
  id: true,
  type: true,
  message: true,
  createdAt: true,
  updatedAt: true,
  deleted: true,
});

/** Zod schemas for manipulating data */
export const LogSchema = z.object({
  id: z.string(),
  type: z.nativeEnum(LogType),
  message: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deleted: z.boolean(),
  deletedAt: z.string(),
});
