import { logger } from "common"
import type { NextRequest } from "next/server"

export const middleware = async (_request: NextRequest) => {
	logger.info("middleware")
}

/** This middleware will only run on these pages */
export const config = {
	matcher: ["/example/:test", "/testing"],
}
