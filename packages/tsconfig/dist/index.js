"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Worker for handling data processing
 * With BullMQ, Bull Board 🎯 & Redis
 */
const accountsHistory_1 = __importDefault(require("./accountsHistory"));
const exchangeRates_1 = require("./exchangeRates");
const prices_1 = __importDefault(require("./market/prices"));
const index_1 = __importDefault(require("./swyftx/index"));
const api_1 = require("@bull-board/api");
const bullMQAdapter_1 = require("@bull-board/api/bullMQAdapter");
const express_1 = require("@bull-board/express");
const bullmq_1 = require("bullmq");
const dotenv = __importStar(require("dotenv"));
const express_2 = __importDefault(require("express"));
dotenv.config();
const redisConfiguration = {
    host: process.env.NODE_ENV === "development" ? "localhost" : "redis",
    port: 6379,
};
const queueOptions = {
    connection: redisConfiguration,
    defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: 1000,
    },
};
/** Create a queue */
const createQueueMQ = (name) => new bullmq_1.Queue(name, queueOptions);
/** Processor */
function setupBullMQProcessor(queueName) {
    /** Queue event logs */
    new bullmq_1.QueueEvents(queueName, queueOptions)
        .on("completed", ({ jobId, returnvalue }) => {
        console.log(`Event: ${jobId} has completed and returned ${returnvalue}`);
    })
        .on("failed", ({ jobId, failedReason }) => {
        console.log(`Event: ${jobId} has failed with ${failedReason}`);
    });
    /** Job hitter 🏏 */
    new bullmq_1.Worker(queueName, async (job) => {
        await job.log(`Starting job ${job.name}`);
        if (job.data.key === "updateMarkets")
            return await (0, prices_1.default)();
        if (job.data.key === "updateForex")
            return await (0, exchangeRates_1.updateExchangeRates)();
        if (job.data.key === "updateSwyftx")
            return await (0, index_1.default)();
        if (job.data.key === "accountsHistory")
            return await (0, accountsHistory_1.default)();
        return;
    }, queueOptions)
        .on("completed", (job) => {
        console.log(`Job: ${job.id} has completed!`);
    })
        .on("failed", (job, err) => {
        console.log(`Job: ${job.id} has failed with ${err.message}`);
    });
}
const run = async () => {
    const queue = createQueueMQ("Scheduled jobs");
    await queue.add("updateMarkets", { key: "updateMarkets" }, {
        repeat: {
            // Every 5 minutes
            pattern: "*/5 * * * *",
        },
    });
    await queue.add("updateForex", { key: "updateForex" }, {
        repeat: {
            pattern: "@hourly",
        },
    });
    await queue.add("updateSwyftx", { key: "updateSwyftx" }, {
        repeat: {
            pattern: "@hourly",
        },
    });
    await queue.add("accountsHistory", { key: "accountsHistory" }, {
        repeat: {
            pattern: "@daily",
        },
    });
    await setupBullMQProcessor(queue.name);
    /** Remove x-powered-by header for security purposes */
    const app = (0, express_2.default)();
    app.disable("x-powered-by");
    const serverAdapter = new express_1.ExpressAdapter();
    serverAdapter.setBasePath("/ui");
    (0, api_1.createBullBoard)({
        queues: [new bullMQAdapter_1.BullMQAdapter(queue)],
        serverAdapter,
    });
    /** Setup Bull board UI */
    app.use("/ui", serverAdapter.getRouter());
    /** App port */
    const PORT = process.env.WORKER_PORT || 3001;
    /** Start express server */
    app.listen(PORT, () => {
        console.log(`Worker running on ${PORT}...`);
        console.log(`Redis is running on ${redisConfiguration.host} with port ${redisConfiguration.port} by default`);
        console.log(`For the UI, open http://localhost:${PORT}/ui`);
    });
};
run().then().catch(console.error);
