import { Prisma, PrismaClient } from '../generated/prisma-client';
export * from '../generated/zod/index';

export * from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prismaOptions: Prisma.PrismaClientOptions = {};

if (!!process.env.NEXT_PUBLIC_DEBUG)
  prismaOptions.log = ['query', 'error', 'warn'];

export const prisma = global.prisma || new PrismaClient(prismaOptions);

export const customPrisma = (options: Prisma.PrismaClientOptions) =>
  new PrismaClient({ ...prismaOptions, ...options });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
