import express from 'express';
import cors from 'cors';
import { json } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { datasiteData } from './schema';

/* TODO: Come up with something engineers actually do in real world backend services to
   demonstrate their knowledge of Express, routing, middleware, error handling, logging,
   environment-based configuration, authentication, and integration with a data store,
   something that actually demonstrates real-world API engineering tasks.
   Once they have done that, unleash them with something they can show off with AI.
 */

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Datasite API',
      version: '1.0.0',
      description: 'REST API for Code Challenge',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./apps/api/src/main.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

function bootstrap() {
  const app = express();

  app.use(cors({ origin: 'http://localhost:4200' }));
  app.use(json());

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  /**
   * @swagger
   * /health:
   *   get:
   *     summary: Health check endpoint
   *     tags: [Health]
   *     responses:
   *       200:
   *         description: API is healthy
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: ok
   *                 timestamp:
   *                   type: string
   *                   format: date-time
   */
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  /**
   * @swagger
   * /api/hello:
   *   get:
   *     summary: Hello endpoint
   *     tags: [General]
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Hello! The Datasite API is running!
   */
  app.get('/api/hello', (_req, res) => {
    res.json({ message: 'Hello! The Datasite API is running!' });
  });

  /**
   * @swagger
   * /api/client:
   *   get:
   *     summary: Get all clients
   *     tags: [Clients]
   *     responses:
   *       200:
   *         description: List of all clients
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: string
   *                   name:
   *                     type: string
   *                   description:
   *                     type: string
   *                   createdAt:
   *                     type: string
   *                     format: date-time
   */
  app.get('/api/clients', (_req, res) => {
    res.json(datasiteData);
  });

  /**
   * @swagger
   * /api/clients/{id}:
   *   get:
   *     summary: Get a client by ID
   *     tags: [Clients]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The datasite ID
   *     responses:
   *       200:
   *         description: Client found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                 name:
   *                   type: string
   *                 description:
   *                   type: string
   *                 createdAt:
   *                   type: string
   *                   format: date-time
   *       404:
   *         description: Client not found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: Client not found
   */
  app.get('/api/clients/:id', (req, res) => {
    const datasite = datasiteData.find((d) => d.id === req.params.id);
    if (!datasite) {
      res.status(404).json({ error: 'Client not found' });
      return;
    }
    res.json(datasite);
  });

  app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
    console.log(`REST API: http://localhost:${PORT}/api`);
    console.log(`Swagger Docs: http://localhost:${PORT}/api-docs`);
  });
}

bootstrap();
