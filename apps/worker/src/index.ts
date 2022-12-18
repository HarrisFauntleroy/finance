/**
 * Worker for handling data processing
 * With BullMQ, Bull Board 🎯 & Redis
 */
import deleter from "./deleter"
import { updateMarketsCrypto } from "./market/crypto"
import updateExchangeRates from "./market/exchangeRates"
import portfolioSnapshot from "./portfolioSnapshot"
import { swyftx } from "./swyftx"
import { ConnectionOptions, Queue, QueueEvents, Worker } from "bullmq"
import { logger } from "common"
import dotenv from "dotenv"

dotenv.config()

const express = require("express")
const {
	ExpressAdapter,
	createBullBoard,
	BullMQAdapter,
} = require("@bull-board/express")

const redisConfiguration: ConnectionOptions = {
	host: process.env.NODE_ENV === "development" ? "localhost" : "redis",
	port: 6379,
}

const queueOptions = {
	connection: redisConfiguration,
	defaultJobOptions: {},
}

const queueName = "Recurring jobs"

const queueMQ = new Queue(queueName, queueOptions)

const serverAdapter = new ExpressAdapter()
serverAdapter.setBasePath("/admin/queues")

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
	queues: [new BullMQAdapter(queueMQ)],
	serverAdapter: serverAdapter,
})

queueMQ.add(
	"updateMarkets",
	{ key: "updateMarkets" },
	{
		jobId: "updateMarkets",
		repeat: {
			// Every 10 minutes
			pattern: "*/10 * * * *",
		},
	}
)

queueMQ.add(
	"updateForex",
	{ key: "updateForex" },
	{
		jobId: "updateForex",
		repeat: {
			// Every 10 minutes
			pattern: "*/10 * * * *",
		},
	}
)
queueMQ.add(
	"updateSwyftx",
	{ key: "updateSwyftx" },
	{
		jobId: "updateSwyftx",
		repeat: {
			// Every 10 minutes
			pattern: "*/10 * * * *",
		},
	}
)
queueMQ.add(
	"portfolioSnapshot",
	{ key: "portfolioSnapshot" },
	{
		jobId: "portfolioSnapshot",
		repeat: {
			// Every 10 minutes
			pattern: "*/10 * * * *",
		},
	}
)
queueMQ.add(
	"deleter",
	{ key: "deleter" },
	{
		jobId: "deleter",
		repeat: {
			// Every 1 minutes
			pattern: "*/1 * * * *",
		},
	}
)

// Maybe if a specific data is passed in they do more
new Worker(queueName, async (job) => {
	job.log(`Starting job ${job.name}`)
	if (job.data.key === "updateMarkets") return await updateMarketsCrypto()
	if (job.data.key === "updateForex") return await updateExchangeRates()
	if (job.data.key === "updateSwyftx") return await swyftx()
	if (job.data.key === "deleter") return await deleter()
	if (job.data.key === "portfolioSnapshot") return await portfolioSnapshot()
	return
})

const queueEvents = new QueueEvents(queueName, queueOptions)

queueEvents.on("completed", ({ jobId, returnvalue }) => {
	logger.info(`JobId: ${jobId} has successfully returned: ${returnvalue}}`)
})

queueEvents.on("failed", ({ jobId, failedReason }) => {
	logger.info(`JobId: ${jobId} has failed: ${failedReason}}`)
})

const app = express()

app.use("/admin/queues", serverAdapter.getRouter())

// other configurations of your server

app.listen(process.env.WORKER_PORT, () => {
	logger.info(process.env.OER_APP_ID)
	console.log(`Running on ${process.env.WORKER_PORT}...`)
	console.log(
		`For the UI, open http://localhost:${process.env.WORKER_PORT}/admin/queues`
	)
	console.log("Make sure Redis is running on port 6379 by default")
})

export {}
