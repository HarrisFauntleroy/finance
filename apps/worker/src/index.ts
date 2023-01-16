/**
 * Worker for handling data processing
 * With BullMQ, Bull Board 🎯 & Redis
 */
import { cleaner } from "./jobs/cleaner"
import { cryptocurrency } from "./jobs/cryptocurrency"
import { history } from "./jobs/history"
import { marketData } from "./jobs/marketData"
import { swyftx } from "./jobs/swyftx"
import bodyParser from "body-parser"
import { ConnectionOptions, Queue, Worker } from "bullmq"
import { logger } from "common"
import dotenv from "dotenv"
import {
	ExpressAdapter,
	createBullBoard,
	BullMQAdapter,
} from "@bull-board/express"
import express from "express"

dotenv.config()

const connection: ConnectionOptions = {
	host: process.env.NODE_ENV === "development" ? "localhost" : "redis",
	port: Number(process.env.REDIS_PORT),
}

const queueOptions = {
	connection,
	defaultJobOptions: {},
}

const queueName = "Schedule tasks"
const primaryQueue = new Queue(queueName, queueOptions)

const serverAdapter = new ExpressAdapter()
serverAdapter.setBasePath("/admin/queues")
createBullBoard({
	queues: [new BullMQAdapter(primaryQueue)],
	serverAdapter: serverAdapter,
})

class Scheduler {
	constructor(private primaryQueue: Queue) {}

	async scheduleJob(
		name: string,
		data: Record<string, unknown>,
		repeat: Record<string, unknown>
	) {
		await this.primaryQueue.add(name, data, { repeat })
	}
}

const scheduler = new Scheduler(primaryQueue)

scheduler.scheduleJob(
	"history",
	{ key: "history" },
	{ pattern: "0 8,20 * * *" }
)
scheduler.scheduleJob(
	"marketData",
	{ key: "marketData" },
	{ pattern: "0 * * * *" }
)
scheduler.scheduleJob(
	"cryptocurrency",
	{ key: "cryptocurrency" },
	{ pattern: "0 * * * *" }
)
scheduler.scheduleJob("swyftx", { key: "swyftx" }, { pattern: "0 * * * *" })
scheduler.scheduleJob("cleaner", { key: "cleaner" }, { pattern: "0 * * * *" })

const worker = new Worker(queueName, async ({ name, data: { key } }) => {
	switch (key) {
		case "marketData":
			return await marketData()
		case "cryptocurrency":
			return await cryptocurrency()
		case "swyftx":
			return await swyftx()
		case "cleaner":
			return await cleaner()
		case "history":
			return await history()
	}
})

worker.on("completed", (job) => {
	logger.info(`Job: ${job.name} has succeeded`)
})

worker.on("failed", async (job) => {
	logger.error(`Job: ${job?.name} has failed`)
})

const app = express()
app.disable("x-powered-by") // Remove x-powered-by header for security purposes
app.use(bodyParser.json())
app.use("/admin/queues", serverAdapter.getRouter())
app.listen(process.env.WORKER_PORT, () => {
	console.log(`Running on ${process.env.WORKER_PORT}...`)
	console.log(
		`For the UI, open http://localhost:${process.env.WORKER_PORT}/admin/queues`
	)
	console.log(
		`Make sure Redis is running on port ${process.env.REDIS_PORT} by default`
	)
})
