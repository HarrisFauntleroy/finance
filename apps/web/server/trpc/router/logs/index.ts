import { prisma } from "database";

import { publicProcedure, router } from "../../trpc";

import { TRPCError } from "@trpc/server";

export const logRouter = router({
  read: publicProcedure.query(async () => {
    try {
      return await prisma.log.findMany({
        orderBy: { createdAt: "desc" },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to fetch logs: ${(error as Error).message}`,
      });
    }
  }),
});
