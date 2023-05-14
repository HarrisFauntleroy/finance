import { logger } from 'common';

import { ExpressAdapter } from '@bull-board/express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Application, Request, Response } from 'express';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';

export const bullBoardPath = '/admin/queues';

export const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath(bullBoardPath);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

export const applyMiddlewares = (app: Application) => {
  app.use(helmet());
  app.use(cors());
  app.use(limiter);
  app.use(bodyParser.json({ limit: '1mb' }));
  app.use(bullBoardPath, serverAdapter.getRouter());
  app.use((err: Error, _req: Request, res: Response): void => {
    logger.error(`An error occurred: ${err.message}`);
    res.status(500).send({ error: err.message });
  });
};
