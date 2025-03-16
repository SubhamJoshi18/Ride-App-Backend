import { Router } from 'express';
import { Request, Response } from 'express';
import statusCode from 'http-status-codes';
import { Users } from '../database/entities/user.entity';
import { findDataFromUser } from '../repository/user.repository';
import { verifyAccessToken } from '../helpers/jwt.helpers';
import { verifyAuthAccessToken } from '../middleware/auth.middleware';

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

/**
 * @openapi
 * /api/test/user:
 *   get:
 *     summary: Get User Data
 *     description: Fetches user data based on the provided Bearer token.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []  # Requires Bearer Token
 *     responses:
 *       200:
 *         description: Successfully retrieved user data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     content:
 *                       type: object
 *                       example:
 *                         id: 1
 *                         username: "john_doe"
 *                         email: "john@example.com"
 *       401:
 *         description: Unauthorized - Bearer token missing or invalid.
 *       403:
 *         description: Forbidden - User does not have the necessary permissions.
 */
healthRouter.get(
  '/test/user',
  verifyAuthAccessToken,
  async (req: Request, res: Response) => {
    const userData = req.user.userId;
    const result = await findDataFromUser('id', userData);
    res.status(200).json({
      data: {
        content: result,
      },
    });
  },
);

export default healthRouter;
