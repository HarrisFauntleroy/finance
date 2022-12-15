"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /**
//  * Worker for handling data processing
//  * With BullMQ, Bull Board 🎯 & Redis
//  */
// import accountsHistory from "./accountsHistory"
// import { updateMarketsCrypto } from "./market/crypto"
// import { updateExchangeRates } from "./market/forex"
// import swyftx from "./swyftx/index"
// import { createBullBoard } from "@bull-board/api"
// import { BullMQAdapter } from "@bull-board/api/bullMQAdapter"
// import { ExpressAdapter } from "@bull-board/express"
// import { ConnectionOptions, Queue, QueueEvents, Worker } from "bullmq"
// import * as dotenv from "dotenv"
// import express from "express"
const accountsHistory_1 = __importDefault(require("./accountsHistory"));
const crypto_1 = require("./market/crypto");
const forex_1 = __importDefault(require("./market/forex"));
const swyftx_1 = __importDefault(require("./swyftx"));
const bullmq_1 = require("bullmq");
// dotenv.config()
// const redisConfiguration: ConnectionOptions = {
// 	host: process.env.NODE_ENV === "development" ? "localhost" : "redis",
// 	port: 6379,
// }
// const queueOptions = {
// 	connection: redisConfiguration,
// 	defaultJobOptions: {},
// }
// const queueName = "Recurring jobs"
// /** Create a queue */
// const queue = new Queue(queueName, queueOptions)
// /** Queue event logs */
// new QueueEvents(queueName, queueOptions)
// 	.on("completed", ({ jobId, returnvalue }) => {
// 		console.log(`Event: ${jobId} has completed and returned ${returnvalue}`)
// 	})
// 	.on("failed", ({ jobId, failedReason }) => {
// 		console.log(`Event: ${jobId} has failed with ${failedReason}`)
// 	})
// /** Job hitter 🏏 */
// new Worker(
// 	queueName,
// 	async (job) => {
// 		 job.log(`Starting job ${job.name}`)
// 		if (job.data.key === "updateMarkets") return await updateMarketsCrypto()
// 		if (job.data.key === "updateForex") return await updateExchangeRates()
// 		if (job.data.key === "updateSwyftx") return await swyftx()
// 		if (job.data.key === "accountsHistory") return await accountsHistory()
// 		return
// 	},
// 	{ ...queueOptions, concurrency: 4 }
// )
// 	.on("completed", (job) => {
// 		console.log(`Job: ${job.id} has completed!`)
// 	})
// 	.on("failed", (job, err) => {
// 		console.log(`Job: ${job?.id} has failed with ${err.message}`)
// 	})
// const run = async () => {
// 	await queue.add(
// 		"updateMarkets",
// 		{ key: "updateMarkets" },
// 		{
// 			jobId: "updateMarkets",
// 			repeat: {
// 				// Every 5 minutes
// 				pattern: "*/5 * * * *",
// 			},
// 		}
// 	)
// 	await queue.add(
// 		"updateForex",
// 		{ key: "updateForex" },
// 		{
// 			jobId: "updateForex",
// 			repeat: {
// 				// Hourly
// 				pattern: "0 * * * *",
// 			},
// 		}
// 	)
// 	await queue.add(
// 		"updateSwyftx",
// 		{ key: "updateSwyftx" },
// 		{
// 			jobId: "updateSwyftx",
// 			repeat: {
// 				// Every day at 8am
// 				pattern: "0 8 * * *",
// 			},
// 		}
// 	)
// 	await queue.add(
// 		"accountsHistory",
// 		{ key: "accountsHistory" },
// 		{
// 			jobId: "accountsHistory",
// 			repeat: {
// 				// Hourly
// 				pattern: "0 * * * *",
// 			},
// 		}
// 	)
// 	/** Remove x-powered-by header for security purposes */
// 	const app = express()
// 	app.disable("x-powered-by")
// 	const serverAdapter = new ExpressAdapter()
// 	serverAdapter.setBasePath("/admin/queues")
// 	createBullBoard({
// 		queues: [new BullMQAdapter(queue)],
// 		serverAdapter,
// 	})
// 	/** Setup Bull board UI */
// 	app.use("/ui", serverAdapter.getRouter())
// 	/** App port */
// 	const PORT = process.env.WORKER_PORT || 3001
// 	/** Start express server */
// 	app.listen(PORT, () => {
// 		console.log(`Worker running on ${PORT}...`)
// 		console.log(
// 			`Redis is running on ${redisConfiguration.host} with port ${redisConfiguration.port} by default`
// 		)
// 		console.log(`For the UI, open http://localhost:${PORT}/ui`)
// 	})
// }
// run().then().catch(console.error)
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
        // Every 5 minutes
        pattern: "*/5 * * * *",
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
        // Every day at 8am
        pattern: "0 8 * * *",
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
app.listen(6001, () => {
    console.log("Running on 6001...");
    console.log("For the UI, open http://localhost:6001/admin/queues");
    console.log("Make sure Redis is running on port 6379 by default");
});
