# AgroVoice: Command Reference

This document outlines the available commands for managing and developing the AgroVoice platform.

## Root Commands
These commands are available in the project root directory.

| Command | Description | Usage |
| :--- | :--- | :--- |
| `npm run install:all` | Installs dependencies for root, client, and server. | `npm run install:all` |
| `npm run build` | Builds both the client and server projects. | `npm run build` |
| `npm run start` | Starts the production server (assumes build). | `npm run start` |
| `npm run client` | Starts the client development server. | `npm run client` |
| `npm run server` | Starts the server in development mode (with nodemon). | `npm run server` |

---

## Client Commands
Available in the `client/` directory.

| Command | Description | Usage |
| :--- | :--- | :--- |
| `npm run dev` | Starts Vite development server. | `cd client && npm run dev` |
| `npm run build` | Compiles TypeScript and builds production assets. | `cd client && npm run build` |
| `npm run lint` | Runs ESLint. | `cd client && npm run lint` |
| `npm run test` | Runs tests using Vitest. | `cd client && npm run test` |

---

## Server Commands
Available in the `server/` directory.

| Command | Description | Usage |
| :--- | :--- | :--- |
| `npm run dev` | Starts server with `nodemon` for hot-reloading. | `cd server && npm run dev` |
| `npm run build` | Compiles TypeScript (tsc). | `cd server && npm run build` |
| `npm run start` | Runs the compiled server (dist). | `cd server && npm run start` |
| `npm run test` | Runs tests using Vitest. | `cd server && npm run test` |
