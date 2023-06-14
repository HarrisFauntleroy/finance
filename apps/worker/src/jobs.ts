import { logger } from "common";

import { cleaner } from "./jobs/cleaner";
import { cryptocurrency } from "./jobs/cryptocurrency";
import { history } from "./jobs/history";
import { markets } from "./jobs/markets";
import { swyftx } from "./jobs/swyftx";

export enum JobName {
  History = "history",
  Markets = "markets",
  Cryptocurrency = "cryptocurrency",
  Swyftx = "swyftx",
  Cleaner = "cleaner",
  Banks = "banks",
}

export const jobFunctions: Record<JobName, () => Promise<void>> = {
  [JobName.History]: history,
  [JobName.Markets]: markets,
  [JobName.Cryptocurrency]: cryptocurrency,
  [JobName.Swyftx]: swyftx,
  [JobName.Cleaner]: cleaner,
  [JobName.Banks]: () => Promise.resolve(),
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
