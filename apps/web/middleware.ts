import { logger } from 'common';

export const middleware = async () => logger.info('middleware');

/** This middleware will only run on these pages */
export const config = {
  matcher: ['/example/:test', '/testing'],
};
