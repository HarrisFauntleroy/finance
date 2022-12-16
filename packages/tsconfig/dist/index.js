"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Worker for handling data processing
 * With BullMQ, Bull Board 🎯 & Redis
 */
const accountsHistory_1 = __importDefault(require("./accountsHistory"));
const crypto_1 = require("./market/crypto");
const forex_1 = __importDefault(require("./market/forex"));
const swyftx_1 = __importDefault(require("./swyftx"));
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
        // Hourly
        pattern: "0 * * * *",
    },
});
queueMQ.add("updateForex", { key: "updateForex" }, {
    jobId: "updateForex",
    repeat: {
        // Hourly
        pattern: "0 * * * *",
    },
});
queueMQ.add("updateSwyftx", { key: "updateSwyftx" }, {
    jobId: "updateSwyftx",
    repeat: {
        // Hourly
        pattern: "0 * * * *",
    },
});
queueMQ.add("accountsHistory", { key: "accountsHistory" }, {
    jobId: "accountsHistory",
    repeat: {
        // Hourly
        pattern: "0 * * * *",
    },
});
new bullmq_1.Worker(queueName, async (job) => {
    job.log(`Starting job ${job.name}`);
    if (job.data.key === "updateMarkets")
        return await (0, crypto_1.updateMarketsCrypto)();
    if (job.data.key === "updateForex")
        return await (0, forex_1.default)();
    if (job.data.key === "updateSwyftx")
        return await (0, swyftx_1.default)();
    if (job.data.key === "accountsHistory")
        return await (0, accountsHistory_1.default)();
    return;
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
