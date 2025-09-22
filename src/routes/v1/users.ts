import express from "express";

import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../../controllers/users";
import { UpdateUserSchema } from "../../schemas/updateUser";
import { UserSchema } from "../../schemas/user";
import { validate } from "../../utils";
import { authenticateToken } from "../../middlewares";

const router = express.Router();

/**
 * @openapi
 * /users/:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users.
 */
router.get("/", getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get users by role
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: false
 *         description: The user's ID
 *     responses:
 *       200:
 *         description: User found
 */
router.get("/:id", getUser);

/**
 * @swagger
 * /users/:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: Alice
 *               email:
 *                 type: string
 *                 format: email
 *                 example: alice@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: 12345
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post("/", validate(UserSchema), createUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update an existing user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: false
 *         description: The user's ID
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
 *               username:
 *                 type: string
 *                 example: Alice
 *               email:
 *                 type: string
 *                 format: email
 *                 example: alice@example.com
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.put("/:id", authenticateToken, validate(UpdateUserSchema), updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Soft delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: false
 *         description: The user's ID
 *     responses:
 *       200:
 *         description: User deleted
 */
router.delete("/:id", authenticateToken, deleteUser);

export default router;
