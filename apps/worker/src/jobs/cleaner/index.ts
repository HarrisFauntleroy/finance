import { prisma } from "database";

import { Progress } from "../../util";

import { subDays } from "date-fns";

export const cleaner = async () => {
  const progress = new Progress(4);

  progress.start("Cleaner");

  const sevenDaysAgo = subDays(new Date(), 7);

  // Delete users
  await prisma.user.deleteMany({
    where: {
      deleted: true,
      deletedAt: {
        lte: sevenDaysAgo,
      },
    },
  });

  progress.increment();

  // Delete settings
  await prisma.settings.deleteMany({
    where: {
      deleted: true,
      deletedAt: {
        lte: sevenDaysAgo,
      },
    },
  });

  progress.increment();

  // Delete budgets
  await prisma.budget.deleteMany({
    where: {
      deleted: true,
      deletedAt: {
        lte: sevenDaysAgo,
      },
    },
  });

  progress.increment();

  // Delete cryptocurrency
  await prisma.cryptocurrency.deleteMany({
    where: {
      deleted: true,
      deletedAt: {
        lte: sevenDaysAgo,
      },
    },
  });

  progress.increment();
  progress.stop("Cleaner");
};
