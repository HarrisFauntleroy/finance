import { logger } from "common"

export class Progress {
	private total: number
	private current: number
	private progressBarLength = 20

	constructor(total: number, startAmount = 0) {
		this.total = total
		this.current = startAmount
	}

	public increment(amount = 1): void {
		this.current += amount
		this.showProgress()
	}

	public start(label?: string): void {
		logger.info(`Starting... ${label}`)
	}

	public stop(label?: string): void {
		logger.info(`Finished... ${label}`)
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
