import { Application, Request, Response } from 'express';

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
import authLogger from '../libs/logger.libs';

function swaggerDocs(app: Application, port: number) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get('/docs.json', (req: Request, res: Response): void => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log(swaggerSpec);
  authLogger.info(`Docs Available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
