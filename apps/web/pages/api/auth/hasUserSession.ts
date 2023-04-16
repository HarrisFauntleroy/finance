import { hasUserSession } from '../../../pages/api/auth/[...nextauth]';

import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * @swagger
 * /api/authenticated:
 *   get:
 *     description: Returns authentication status
 *     responses:
 *       200:
 *         description: userId
 *       401:
 *         description: You must be signed in to view the protected content on this page.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await hasUserSession(req, res)
    .then((userId) => res.status(200).send(userId))
    .catch(() =>
      res.status(401).send({
        error:
          'You must be signed in to view the protected content on this page.',
      }),
    );
}
