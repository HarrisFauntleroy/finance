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

  createJobs() {
    return [
      this.validateJobOptions(JobName.History, "0 8,20 * * *"),
      this.validateJobOptions(JobName.MarketData, "0 0 * * *"),
      this.validateJobOptions(JobName.Cryptocurrency, "0 0 * * *"),
      this.validateJobOptions(JobName.Swyftx, "0 0 * * *"),
      this.validateJobOptions(JobName.Cleaner, "0 0 * * *"),
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
      .then(() => {
        logger.info(`Successfully scheduled job: ${name}`);
      })
      .catch((error) => {
        logger.error(
          `Error scheduling job ${name}: ${(error as Error).message}`
        );
        throw error; // Rethrow the error after logging it
      });
  }
}
