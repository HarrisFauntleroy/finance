"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Worker for handling data processing
 * With BullMQ, Bull Board 🎯 & Redis
 */
const deleter_1 = __importDefault(require("./deleter"));
const crypto_1 = require("./market/crypto");
const exchangeRates_1 = __importDefault(require("./market/exchangeRates"));
const portfolioSnapshot_1 = __importDefault(require("./portfolioSnapshot"));
const swyftx_1 = require("./swyftx");
const bullmq_1 = require("bullmq");
const common_1 = require("common");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express = require("express");
const { ExpressAdapter, createBullBoard, BullMQAdapter, } = require("@bull-board/express");
const redisConfiguration = {
    host: process.env.NODE_ENV === "development" ? "localhost" : "redis",
    port: 6379,
};
const queueOptions = {
    connection: redisConfiguration,
    defaultJobOptions: {},
};
const queueName = "Recurring jobs";
const queueMQ = new bullmq_1.Queue(queueName, queueOptions);
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");
const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
    queues: [new BullMQAdapter(queueMQ)],
    serverAdapter: serverAdapter,
});
queueMQ.add("updateMarkets", { key: "updateMarkets" }, {
    jobId: "updateMarkets",
    repeat: {
        // Every 10 minutes
        pattern: "*/10 * * * *",
    },
});
queueMQ.add("updateForex", { key: "updateForex" }, {
    jobId: "updateForex",
    repeat: {
        // Every 10 minutes
        pattern: "*/10 * * * *",
    },
});
queueMQ.add("updateSwyftx", { key: "updateSwyftx" }, {
    jobId: "updateSwyftx",
    repeat: {
        // Every 10 minutes
        pattern: "*/10 * * * *",
    },
});
queueMQ.add("portfolioSnapshot", { key: "portfolioSnapshot" }, {
    jobId: "portfolioSnapshot",
    repeat: {
        // Every 10 minutes
        pattern: "*/10 * * * *",
    },
});
queueMQ.add("deleter", { key: "deleter" }, {
    jobId: "deleter",
    repeat: {
        // Every 10 minutes
        pattern: "*/10 * * * *",
    },
});
// Maybe if a specific data is passed in they do more
const worker = new bullmq_1.Worker(queueName, async (job) => {
    job.log(`Starting job ${job.name}`);
    if (job.data.key === "updateMarkets")
        return await (0, crypto_1.updateMarketsCrypto)();
    if (job.data.key === "updateForex")
        return await (0, exchangeRates_1.default)();
    if (job.data.key === "updateSwyftx")
        return await (0, swyftx_1.swyftx)();
    if (job.data.key === "deleter")
        return await (0, deleter_1.default)();
    if (job.data.key === "portfolioSnapshot")
        return await (0, portfolioSnapshot_1.default)();
    return;
});
worker.on("completed", (job) => {
    common_1.logger.info(`JobId: ${job.name} has successfully returned: ${job.returnvalue}}`);
});
worker.on("failed", (job) => {
    common_1.logger.info(`JobId: ${job?.name} has failed: ${job?.failedReason}}`);
});
const app = express();
app.use("/admin/queues", serverAdapter.getRouter());
// other configurations of your server
app.listen(process.env.WORKER_PORT, () => {
    common_1.logger.info(process.env.OER_APP_ID);
    console.log(`Running on ${process.env.WORKER_PORT}...`);
    console.log(`For the UI, open http://localhost:${process.env.WORKER_PORT}/admin/queues`);
    console.log("Make sure Redis is running on port 6379 by default");
});
