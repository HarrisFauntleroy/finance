import { logger } from "common";

import config from "./env";
import { findAndRunJobByName, JobName } from "./jobs";
import { applyMiddlewares, BULL_BOARD_PATH, serverAdapter } from "./middleware";
import { Scheduler } from "./scheduler";

import { BullMQAdapter, createBullBoard } from "@bull-board/express";
import {
  ConnectionOptions,
  QueueEvents,
  Queue as QueueMQ,
  Worker,
} from "bullmq";
import express from "express";

const connection: ConnectionOptions = {
  host: config.NODE_ENV === "development" ? "localhost" : "redis",
  port: Number(config.REDIS_PORT),
};

const queueOptions = {
  connection,
  defaultJobOptions: {
    attempts: 5,
    backoff: {
      type: "exponential",
      delay: 5000,
    },
    removeOnComplete: true,
  },
};

const queueName = "Schedule tasks";
const queueMQ = new QueueMQ(queueName, queueOptions);

const app = express();
applyMiddlewares(app);

createBullBoard({
  queues: [new BullMQAdapter(queueMQ)],
  serverAdapter,
});

const scheduler = new Scheduler(queueMQ);

scheduler.init();

new Worker<{ name: JobName }>(queueName, async ({ data: { name } }) => {
  return findAndRunJobByName(name);
})
  .on("completed", (job) => {
    const lastSuccessfulJobTimestamp = new Date();
    logger.info(`Job with id ${job.id} has completed`);
    console.log(`Last successful job ran at: ${lastSuccessfulJobTimestamp}`);
  })
  .on("failed", async (job, error) => {
    logger.error(`Job: ${job?.name} has failed: ${error}`);
  });

const queueEvents = new QueueEvents(queueName, queueOptions);
queueEvents.on("error", (error) => {
  logger.error(`Redis connection error: ${error.message}`);
});

app.listen(config.WORKER_PORT, () => {
  logger.info(`
  ################################################
    
  Server running on port ${config.WORKER_PORT} in ${config.NODE_ENV} mode.
  For the UI, open http://localhost:${config.WORKER_PORT}${BULL_BOARD_PATH}

  ################################################
`);
});

process.on("SIGTERM", async () => {
  logger.info("SIGTERM signal received: closing queues and workers");
  await queueEvents.close();
  await queueMQ.close();
  process.exit(0);
});
