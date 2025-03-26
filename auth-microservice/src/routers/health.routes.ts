import { Router } from 'express';
import { Request, Response } from 'express';
import statusCode from 'http-status-codes';

const healthRouter = Router();

/**
 * @openapi
 * /api/health:
 *   get:
 *     summary: Health Check
 *     description: Returns the health status of the API.
 *     tags:
 *       - Health
 *     responses:
 *       202:
 *         description: API is up and running.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "The Route : /health is Working!!"
 *                 time:
 *                   type: string
 *                   format: date
 *                   example: "Sun Mar 16 2025"
 *                 error:
 *                   type: boolean
 *                   example: false
 */
healthRouter.get('/health', (req: Request, res: Response): void => {
  res.status(statusCode.ACCEPTED).json({
    message: `The Route : ${req.originalUrl} is Working!!`,
    time: new Date().toDateString(),
    error: false,
  });
});

export default healthRouter;
