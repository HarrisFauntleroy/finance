/**
 * Worker for handling data processing
 * With BullMQ, Bull Board 🎯 & Redis
 */
import accountsHistory from "./accountsHistory"
import { updateMarketsCrypto } from "./market/crypto"
import updateExchangeRates from "./market/forex"
import swyftx from "./swyftx"
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
			// Hourly
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
			// Hourly
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
			// Hourly
			pattern: "0 * * * *",
		},
	}
)
queueMQ.add(
	"accountsHistory",
	{ key: "accountsHistory" },
	{
		jobId: "accountsHistory",
		repeat: {
			// Hourly
			pattern: "0 * * * *",
		},
	}
)

new Worker(queueName, async (job) => {
	job.log(`Starting job ${job.name}`)
	if (job.data.key === "updateMarkets") return await updateMarketsCrypto()
	if (job.data.key === "updateForex") return await updateExchangeRates()
	if (job.data.key === "updateSwyftx") return await swyftx()
	if (job.data.key === "accountsHistory") return await accountsHistory()
	return
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
