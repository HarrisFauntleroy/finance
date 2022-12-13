import * as ___generated_prisma_client from '../generated/prisma-client';
import { PrismaClient } from '../generated/prisma-client';
export * from '@prisma/client';

declare global {
    var prisma: PrismaClient | undefined;
}
declare const prisma: PrismaClient<___generated_prisma_client.Prisma.PrismaClientOptions, never, ___generated_prisma_client.Prisma.RejectOnNotFound | ___generated_prisma_client.Prisma.RejectPerOperation | undefined>;

export { prisma };
