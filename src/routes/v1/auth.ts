import express from "express";

import { registerUser, signIn } from "../../controllers/auth";
import { verifyUserSchema } from "../../schemas/verifyUser";
import { validate } from "../../utils";
import { UserRegisterSchema } from "../../schemas/registerUser";

const router = express.Router();

/**
 * @swagger
 * /api/v1/auth/sign-in:
 *   post:
 *     summary: User sign in
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: alice@example.com
 *               password:
 *                 type: string
 *                 example: 12345
 *     responses:
 *       200:
 *         description: Desc.
 */
router.post("/sign-in", validate(verifyUserSchema), signIn);

router.post("/register", validate(UserRegisterSchema), registerUser);

export default router;
