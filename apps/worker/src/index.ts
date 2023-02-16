/**
 * Worker for handling data processing
 * With BullMQ, Bull Board 🎯 & Redis
 */
import { cleaner } from "./jobs/cleaner"
import { cryptocurrency } from "./jobs/cryptocurrency"
import { history } from "./jobs/history"
import { marketData } from "./jobs/marketData"
import { swyftx } from "./jobs/swyftx"
import {
	BullMQAdapter,
	ExpressAdapter,
	createBullBoard,
} from "@bull-board/express"
import bodyParser from "body-parser"
import { ConnectionOptions, Queue as QueueMQ, Worker } from "bullmq"
import { logger } from "common"
import { config } from "dotenv"
import express from "express"

/** dotenv */
config()

const bullBoardPath = "/admin/queues"

const connection: ConnectionOptions = {
	host: process.env.NODE_ENV === "development" ? "localhost" : "redis",
	port: Number(process.env.REDIS_PORT),
}

const queueOptions = {
	connection,
	defaultJobOptions: {},
}

const queueName = "Schedule tasks"
const queueMQ = new QueueMQ(queueName, queueOptions)

const serverAdapter = new ExpressAdapter()
serverAdapter.setBasePath(bullBoardPath)

createBullBoard({
	queues: [new BullMQAdapter(queueMQ)],
	serverAdapter,
})

class Scheduler {
	constructor(private queue: QueueMQ) {}

	async scheduleJob(
		name: string,
		data: Record<string, unknown>,
		repeat: Record<string, unknown>
	) {
		await this.queue.add(name, data, { repeat })
	}
}

const scheduler = new Scheduler(queueMQ)

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

const worker = new Worker(queueName, async ({ data: { key } }) => {
	switch (key) {
		case "marketData":
			return marketData()
		case "cryptocurrency":
			return cryptocurrency()
		case "swyftx":
			return swyftx()
		case "cleaner":
			return cleaner()
		case "history":
			return history()
	}
})

worker.on("completed", (job) => {
	logger.info(`Job: ${job.name} has succeeded`)
})

worker.on("failed", async (job) => {
	logger.error(`Job: ${job?.name} has failed`)
})

const app = express()

app.disable("x-powered-by")

app.use(bodyParser.json())

app.use(bullBoardPath, serverAdapter.getRouter())

app.listen(process.env.WORKER_PORT, () => {
	console.log("Running on 3000...")
	console.log("For the UI, open http://localhost:3000/ui")
	console.log("Make sure Redis is running on port 6379 by default")
	console.log("To populate the queue, run:")
	console.log("  curl http://localhost:3000/add?title=Example")
	console.log("To populate the queue with custom options (opts), run:")
	console.log("  curl http://localhost:3000/add?title=Test&opts[delay]=9")
})
