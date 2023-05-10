import { withSwagger } from 'next-swagger-doc';

const swaggerHandler = withSwagger({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Alchemical Finance API Example',
      version: '0.1.0',
    },
  },
  apiFolder: 'src/pages/api',
});

/**
 * @swagger
 * /api/doc:
 *   get:
 *     description: Runs swagger handler
 */
export default swaggerHandler();
