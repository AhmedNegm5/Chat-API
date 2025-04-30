const express = require("express");
const router = express.Router();

const {
  createChat,
  userChats,
  findChat,
} = require("../controllers/chatController");

/**
 * @swagger
 * /chats:
 *   post:
 *     summary: Create a new chat
 *     tags: [Chats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstId
 *               - secondId
 *             properties:
 *               firstId:
 *                 type: string
 *               secondId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Chat created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 chat:
 *                   $ref: '#/components/schemas/Chat'
 *       200:
 *         description: Chat already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 chat:
 *                   $ref: '#/components/schemas/Chat'
 */
router.post("/", createChat);

/**
 * @swagger
 * /chats/{userId}:
 *   get:
 *     summary: Get all chats for a user
 *     tags: [Chats]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of chats
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 chats:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Chat'
 */
router.get("/:userId", userChats);

/**
 * @swagger
 * /chats/find/{firstId}/{secondId}:
 *   get:
 *     summary: Find chat between two users
 *     tags: [Chats]
 *     parameters:
 *       - in: path
 *         name: firstId
 *         required: true
 *         schema:
 *           type: string
 *         description: First user ID
 *       - in: path
 *         name: secondId
 *         required: true
 *         schema:
 *           type: string
 *         description: Second user ID
 *     responses:
 *       200:
 *         description: Chat found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 chat:
 *                   $ref: '#/components/schemas/Chat'
 *       404:
 *         description: Chat not found
 */
router.get("/find/:firstId/:secondId", findChat);

module.exports = router;
