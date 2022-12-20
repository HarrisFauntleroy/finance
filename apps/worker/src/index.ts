/**
 * Worker for handling data processing
 * With BullMQ, Bull Board 🎯 & Redis
 */
import deleter from "./features/deleter"
import { updateMarketsCrypto } from "./features/market/crypto"
import updateExchangeRates from "./features/market/exchangeRates"
import portfolioSnapshot from "./features/portfolioSnapshot"
import { swyftx } from "./features/swyftx"
import { ConnectionOptions, Queue, Worker } from "bullmq"
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
			// “At minute 0.”
			pattern: "0 * * * *",
		},
	}
)

queueMQ.add(
	"updateForex",
	{ key: "updateForex" },
	{
		jobId: "updateForex",
		repeat: {
			// “At minute 0.”
			pattern: "0 * * * *",
		},
	}
)
queueMQ.add(
	"updateSwyftx",
	{ key: "updateSwyftx" },
	{
		jobId: "updateSwyftx",
		repeat: {
			// "At 08:00 and 20:00"
			pattern: "0 8,20 * * *",
		},
	}
)
queueMQ.add(
	"portfolioSnapshot",
	{ key: "portfolioSnapshot" },
	{
		jobId: "portfolioSnapshot",
		repeat: {
			// "At 08:00 and 20:00"
			pattern: "0 8,20 * * *",
		},
	}
)
queueMQ.add(
	"deleter",
	{ key: "deleter" },
	{
		jobId: "deleter",
		repeat: {
			// “At 00:00.”
			pattern: "0 0 * * *",
		},
	}
)

// Maybe if a specific data is passed in they do more
const worker = new Worker(queueName, async (job) => {
	job.log(`Starting job ${job.name}`)
	if (job.data.key === "updateMarkets") return await updateMarketsCrypto()
	if (job.data.key === "updateForex") return await updateExchangeRates()
	if (job.data.key === "updateSwyftx") return await swyftx()
	if (job.data.key === "deleter") return await deleter()
	if (job.data.key === "portfolioSnapshot") return await portfolioSnapshot()
	return
})

worker.on("completed", (job) => {
	logger.info(`Job: ${job.name} has succeeded`)
})

worker.on("failed", (job) => {
	logger.error(`Job: ${job?.name} has failed`)
})

/** Remove x-powered-by header for security purposes */
const app = express()
app.disable("x-powered-by")

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
