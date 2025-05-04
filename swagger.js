const swaggerJsdoc = require("swagger-jsdoc");
const dotenv = require("dotenv");

dotenv.config();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Chat API Documentation",
      version: "1.0.0",
      description: `
# Chat API Documentation

## Overview
This API provides a complete chat application with both REST endpoints and real-time WebSocket communication using Socket.IO.

## Authentication
The API uses JWT tokens for user identification. After successful login, you'll receive a token that can be used to identify the user in subsequent requests.

### Login Flow
1. Register a new user using the register endpoint
2. Login using the login endpoint to receive a token
3. The token is returned in the response but is not required for API requests

## WebSocket Communication

### Connection
To establish a WebSocket connection, use:
\`\`\`javascript
const socket = io('${process.env.BASE_URL || "http://localhost:5000"}');
\`\`\`

### Events

#### User Management
- **addNewUser**: Add a user to the online users list
- **getOnlineUsers**: Get list of all online users

#### Messaging
- **sendMessage**: Send a real-time message
- **getMessage**: Receive a real-time message
- **getNotification**: Receive message notifications

### Event Details

#### addNewUser
\`\`\`json
{
  "event": "addNewUser",
  "payload": {
    "userId": "string"
  }
}
\`\`\`

#### sendMessage
\`\`\`json
{
  "event": "sendMessage",
  "payload": {
    "senderId": "string",
    "recipientId": "string",
    "text": "string"
  }
}
\`\`\`

#### getMessage
\`\`\`json
{
  "event": "getMessage",
  "payload": {
    "senderId": "string",
    "recipientId": "string",
    "text": "string"
  }
}
\`\`\`

#### getNotification
\`\`\`json
{
  "event": "getNotification",
  "payload": {
    "senderId": "string",
    "isRead": false,
    "date": "2024-01-01T00:00:00.000Z"
  }
}
\`\`\`

## REST API Endpoints
The following sections document the REST API endpoints available in this application.
      `,
    },
    servers: [
      {
        url: `${process.env.BASE_URL}/api` || "http://localhost:5000/api",
        description: "API Server",
      },
    ],
    tags: [
      {
        name: "Users",
        description: "User management endpoints",
      },
      {
        name: "Chats",
        description: "Chat management endpoints",
      },
      {
        name: "Messages",
        description: "Message management endpoints",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          description: "User model",
          properties: {
            name: {
              type: "string",
              minLength: 3,
              maxLength: 30,
              example: "John Doe",
              description: "User's full name",
            },
            email: {
              type: "string",
              format: "email",
              example: "john@example.com",
              description: "User's email address",
            },
            password: {
              type: "string",
              minLength: 4,
              example: "password123",
              description: "User's password (min 4 characters)",
            },
          },
          required: ["name", "email", "password"],
        },
        Chat: {
          type: "object",
          description: "Chat model",
          properties: {
            members: {
              type: "array",
              items: {
                type: "string",
              },
              example: ["user1_id", "user2_id"],
              description: "Array of user IDs participating in the chat",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Chat creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Chat last update timestamp",
            },
          },
        },
        Message: {
          type: "object",
          description: "Message model",
          properties: {
            chatId: {
              type: "string",
              example: "chat_id_123",
              description: "ID of the chat the message belongs to",
            },
            senderId: {
              type: "string",
              example: "user_id_123",
              description: "ID of the user who sent the message",
            },
            text: {
              type: "string",
              example: "Hello, how are you?",
              description: "Message content",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Message creation timestamp",
            },
          },
          required: ["chatId", "senderId", "text"],
        },
        Error: {
          type: "object",
          description: "Error response",
          properties: {
            message: {
              type: "string",
              example: "Error message",
              description: "Error description",
            },
          },
        },
      },
      responses: {
        NotFoundError: {
          description: "Resource not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        BadRequestError: {
          description: "Invalid request parameters",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
