import { Router } from 'express';
import {
  SINGUP_API_ROUTES,
  LOGIN_API_ROUTES,
} from '../constants/auth-api.constant';
import { loginUser, signUpUser } from '../controller/auth.controller';

const authRouter = Router();

/**
 * @openapi
 * /api/signup:
 *   post:
 *     summary: User Signup
 *     description: Create a new user account.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phoneNumber
 *               - password
 *               - username
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: +977 9818737102
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "StrongPassword123!"
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User registered successfully."
 *       400:
 *         description: Invalid input data.
 */

/**
 * @openapi
 * /api/login:
 *   post:
 *     summary: User Login
 *     description: Authenticate a user and return an access token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phoneNumber
 *               - password
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: +977 9818737102
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "StrongPassword123!"
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR..."
 *       401:
 *         description: Invalid credentials.
 */

authRouter.post(SINGUP_API_ROUTES, signUpUser as any);
authRouter.post(LOGIN_API_ROUTES, loginUser as any);

export default authRouter;
