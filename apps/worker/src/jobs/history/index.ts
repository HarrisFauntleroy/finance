import { prisma } from "database";

import { Progress } from "../../util";
import { calculateAssetValuesTotals } from "./assets";

export const history = async () => {
  /** Get userId of signed in user */
  const users: { id: string }[] = await prisma.user.findMany({
    select: {
      id: true,
    },
  });

  const progress = new Progress(users.length);

  progress.start("History");

  const results: { user?: string; status: string }[] = [];

  // Assets portfolioSnapshot
  await Promise.all(
    users.map(async ({ id: userId }) => {
      try {
        /** Calculate overview totals to store for history */
        const totals = await calculateAssetValuesTotals(userId);
        /** Create new portfolioSnapshot entry */
        const response = await prisma.portfolioSnapshot.create({
          data: {
            userId,
            currency: totals.userCurrency,
            costBasis: totals.totalCostBasis,
            totalValue: totals.totalValue,
            realisedGain: "0",
            saleableValue: totals.saleableValue,
            unrealisedGain: totals.unrealisedGain,
          },
          select: {
            id: true,
            userId: true,
            totalValue: true,
            costBasis: true,
            unrealisedGain: true,
            realisedGain: true,
            saleableValue: true,
            createdAt: true,
          },
        });
        progress.increment();
        /** Return PortfolioSnapshot object */
        results.push({ user: response.userId, status: "Succeeded" });
      } catch (error) {
        progress.increment();
        /** Return the thrown error */
        results.push({ status: "Failed" });
      }
      return results;
    })
  );

  progress.stop("History");
};
