import { logger } from "common";

import { JobName } from "./jobs";

import { JobsOptions, Queue as QueueMQ } from "bullmq";
import { isValidCron } from "cron-validator";

export class Scheduler {
  constructor(private queue: QueueMQ) {}

  async init() {
    await Promise.allSettled(
      this.createJobs().map((job) => this.scheduleJob(job))
    );
  }

  validateJobOptions = (name: JobName, pattern: string) => {
    if (!isValidCron(pattern))
      throw new Error(`Invalid cron pattern for job ${name}: ${pattern}`);
    return {
      name,
      data: { name },
      options: { repeat: { pattern }, jobId: name },
    };
  };

  CRON_TIMES = {
    EVERY_5_MINUTES: "*/5 * * * *",
    EVERY_10_MINUTES: "*/10 * * * *",
    EVERY_15_MINUTES: "*/15 * * * *",
    EVERY_30_MINUTES: "*/30 * * * *",
    EVERY_HOUR: "0 * * * *",
    EVERY_2_HOURS: "0 */2 * * *",
    EVERY_3_HOURS: "0 */3 * * *",
    EVERY_4_HOURS: "0 */4 * * *",
    EVERY_6_HOURS: "0 */6 * * *",
    EVERY_12_HOURS: "0 */12 * * *",
    EVERY_DAY: "0 0 * * *",
    EVERY_WEEK: "0 0 * * 0",
    EVERY_MONTH: "0 0 1 * *",
    EVERY_YEAR: "0 0 1 1 *",
    EVERY_DAY_AT_6AM_AND_6PM: "0 6,18 * * *",
    EVERY_DAY_AT_12AM_AND_12PM: "0 0,12 * * *",
  };

  createJobs() {
    return [
      this.validateJobOptions(
        JobName.History,
        this.CRON_TIMES.EVERY_DAY_AT_6AM_AND_6PM
      ),
      this.validateJobOptions(JobName.Markets, this.CRON_TIMES.EVERY_DAY),
      this.validateJobOptions(
        JobName.Cryptocurrency,
        this.CRON_TIMES.EVERY_DAY
      ),
      this.validateJobOptions(JobName.Swyftx, this.CRON_TIMES.EVERY_DAY),
      this.validateJobOptions(JobName.Cleaner, this.CRON_TIMES.EVERY_DAY),
    ];
  }

  async scheduleJob({
    name,
    options,
  }: {
    name: JobName;
    options: JobsOptions;
  }) {
    return this.queue
      .add(name, { name }, options)
      .then(() => logger.info(`Successfully scheduled job: ${name}`))
      .catch((error) => {
        logger.error(
          `Error scheduling job ${name}: ${(error as Error).message}`
        );
        throw error; // Rethrow the error after logging it
      });
  }
}
