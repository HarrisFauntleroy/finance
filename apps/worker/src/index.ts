/**
 * Worker for handling data processing
 * With BullMQ, Bull Board 🎯 & Redis
 */
import { cleaner } from "./jobs/cleaner"
import { cryptocurrency } from "./jobs/cryptocurrency"
import { history } from "./jobs/history"
import { markets } from "./jobs/markets"
import { swyftx } from "./jobs/swyftx"
import bodyParser from "body-parser"
import { ConnectionOptions, Queue, Worker } from "bullmq"
import { logger } from "common"
import { prisma } from "database"
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

const queueName = "Schedule tasks"

const queueMQ = new Queue(queueName, queueOptions)

const serverAdapter = new ExpressAdapter()
serverAdapter.setBasePath("/admin/queues")

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
	queues: [new BullMQAdapter(queueMQ)],
	serverAdapter: serverAdapter,
})

queueMQ.add(
	"markets",
	{ key: "markets" },
	{
		jobId: "markets",
		repeat: {
			// Hourly
			pattern: "0 * * * *",
		},
	}
)

queueMQ.add(
	"cryptocurrency",
	{ key: "cryptocurrency" },
	{
		jobId: "cryptocurrency",
		repeat: {
			// Hourly
			pattern: "0 * * * *",
		},
	}
)

queueMQ.add(
	"swyftx",
	{ key: "swyftx" },
	{
		jobId: "swyftx",
		repeat: {
			// Hourly
			pattern: "0 * * * *",
		},
	}
)

queueMQ.add(
	"cleaner",
	{ key: "cleaner" },
	{
		jobId: "cleaner",
		repeat: {
			// Hourly
			pattern: "0 * * * *",
		},
	}
)

queueMQ.add(
	"history",
	{ key: "history" },
	{
		jobId: "history",
		repeat: {
			// "At 08:00 and 20:00"
			pattern: "0 8,20 * * *",
		},
	}
)

// Maybe if a specific data is passed in they do more
const worker = new Worker(queueName, async ({ name, data: { key }, log }) => {
	switch (key) {
		case "markets":
			return await markets()
		case "cryptocurrency":
			return await cryptocurrency()
		case "swyftx":
			return await swyftx()
		case "cleaner":
			return await cleaner()
		case "history":
			return await history()

		default:
			log(`Failed to find job ${name}`)
			break
	}
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

app.use(bodyParser.json())

/**
 * @swagger
 * paths:
 *   /log:
 *     post:
 *       summary: Creates a new log entry
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type:
 *                   type: string
 *                   description: The type of log entry
 *                 message:
 *                   type: string
 *                   description: The message for the log entry
 *       responses:
 *         200:
 *           description: Log entry created successfully
 *         500:
 *           description: An error occurred while creating the log entry
 */
app.post(
	"/log",
	async (
		req: { body: { type: any; message: any } },
		res: { sendStatus: (arg0: number) => void }
	) => {
		const { type, message } = req.body
		try {
			await prisma.log.create({ data: { type, message } })
			res.sendStatus(200)
		} catch (err) {
			console.error(err)
			res.sendStatus(500)
		}
	}
)

app.listen(process.env.WORKER_PORT, () => {
	logger.info(process.env.OER_APP_ID)
	console.log(`Running on ${process.env.WORKER_PORT}...`)
	console.log(
		`For the UI, open http://localhost:${process.env.WORKER_PORT}/admin/queues`
	)
	console.log("Make sure Redis is running on port 6379 by default")
})

export {}
