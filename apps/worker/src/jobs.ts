import { logger } from "common";

import { cleaner } from "./jobs/cleaner";
import { cryptocurrency } from "./jobs/cryptocurrency";
import { history } from "./jobs/history";
import { marketData } from "./jobs/marketData";
import { swyftx } from "./jobs/swyftx";

export enum JobName {
  History = "history",
  MarketData = "marketData",
  Cryptocurrency = "cryptocurrency",
  Swyftx = "swyftx",
  Cleaner = "cleaner",
}

export const jobFunctions: Record<JobName, () => Promise<void>> = {
  [JobName.History]: history,
  [JobName.MarketData]: marketData,
  [JobName.Cryptocurrency]: cryptocurrency,
  [JobName.Swyftx]: swyftx,
  [JobName.Cleaner]: cleaner,
};

export const findAndRunJobByName = async (name: JobName): Promise<void> => {
  const jobFunction = jobFunctions[name];
  if (!jobFunction) {
    throw new Error(`Unrecognized job: ${name}`);
  }

  return jobFunction().catch((error) => {
    logger.error(`Error running job ${name}: ${(error as Error).message}`);
    throw error;
  });
};
