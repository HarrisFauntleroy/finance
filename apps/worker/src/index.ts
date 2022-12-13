/**
 * Worker for handling data processing
 * With BullMQ, Bull Board 🎯 & Redis
 */
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";
import { ConnectionOptions, Job, Queue, QueueEvents, Worker } from "bullmq";
import { prisma } from "database";
import * as dotenv from "dotenv";
import express from "express";

dotenv.config();

const redisConfig: ConnectionOptions = {
  host: process.env.NODE_ENV === "development" ? "localhost" : "redis",
  port: 6379,
};

const queueOptions = {
  connection: redisConfig,
  defaultJobOptions: {
    removeOnComplete: true,
    removeOnFail: 1000,
  },
};

/** Create a queue */
const createQueueMQ = (name: string) => new Queue(name, queueOptions);

const onSuccess = (job: Job) => {
  job.log(`Finished job @ ${new Date().toISOString()}`);
  return new Date().toISOString();
};

const onError = (job: Job, error: Error) => {
  job.log(`Error ${error.message}`);
  throw new Error(error.message);
};

/** Processor */
function setupBullMQProcessor(queueName: string) {
  /** Queue event logs */
  new QueueEvents(queueName, queueOptions)
    .on("completed", ({ jobId, returnvalue }) => {
      console.log(`Event: ${jobId} has completed and returned ${returnvalue}`);
    })
    .on("failed", ({ jobId, failedReason }) => {
      console.log(`Event: ${jobId} has failed with ${failedReason}`);
    });

  /** API hitter 🏏 */
  new Worker(
    queueName,
    (job: Job) => {
      switch (job.data.key) {
        case "updateMarkets":
          return prisma.user.count();

        case "updateForex":
          return prisma.user.count();

        case "updateSwyftx":
          return prisma.user.count();

        case "accountsHistory":
          return prisma.user.count();

        default:
          throw Error();
      }
    },
    queueOptions
  )
    .on("completed", (job) => {
      console.log(`Job: ${job.id} has completed!`);
    })
    .on("failed", (job, err) => {
      console.log(`Job: ${job.id} has failed with ${err.message}`);
    });
}

const run = async () => {
  const queue = createQueueMQ("Scheduled jobs");

  async function addJobs() {
    await queue.add("updateMarkets", { key: "updateMarkets" });
    await queue.add("updateForex", { key: "updateForex" });
  }

  await setupBullMQProcessor(queue.name);

  /** Remove x-powered-by header for security purposes */
  const app = express();
  app.disable("x-powered-by");

  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath("/ui");

  createBullBoard({
    queues: [new BullMQAdapter(queue)],
    serverAdapter,
  });

  /** Setup Bull board UI */
  app.use("/ui", serverAdapter.getRouter());

  /** App port */
  const PORT = process.env.WORKER_PORT || 3001;
  /** Start express server */
  app.listen(PORT, () => {
    console.log(`Worker running on ${PORT}...`);
    console.log(
      `Redis is running on ${redisConfig.host} with port ${redisConfig.port} by default`
    );
    console.log(`For the UI, open http://localhost:${PORT}/ui`);
  });
};

run().then().catch(console.error);
