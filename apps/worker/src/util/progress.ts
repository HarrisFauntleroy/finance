import { logger } from "common"

export class Progress {
	private total: number
	private current: number
	private progressBarLength: number = 20

	constructor(total: number, startAmount: number = 0) {
		this.total = total
		this.current = startAmount
	}

	public increment(amount: number = 1): void {
		this.current += amount
		this.showProgress()
	}

	public start(): void {
		logger.info("Starting...")
	}

	public stop(): void {
		logger.info("Finished...")
	}

	private showProgress(): void {
		const percentage = (this.current / this.total) * 100
		const progressBar = this.getProgressBar(percentage)
		logger.info(`${percentage}% ${progressBar}`)
	}

	private getProgressBar(percentage: number): string {
		const progress = Math.round((percentage / 100) * this.progressBarLength)
		return `[${"|".repeat(progress)}${"-".repeat(
			this.progressBarLength - progress
		)}]`
	}
}
