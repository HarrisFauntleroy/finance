import { z } from "zod";

export const byId = z.object({
  id: z.string(),
});

export const byUserId = z.object({
  userId: z.string(),
});

export const byParentId = z.object({
  parentId: z.string(),
});
