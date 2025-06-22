# mongo-server-mongoose

A Node.js server boilerplate using Express, Mongoose, and TypeScript, designed for rapid development of MongoDB-backed RESTful APIs.

## Table of Contents

* [Introduction](#introduction)
* [Installation](#installation)
* [Usage](#usage)
* [Features](#features)
* [Dependencies](#dependencies)
* [Development Scripts](#development-scripts)
* [Configuration](#configuration)
* [Troubleshooting](#troubleshooting)
* [License](#license)

## Introduction

This project is a TypeScript-based Express server that connects to a MongoDB database using Mongoose. It is intended as a starting point for building secure and scalable backend applications with RESTful APIs.

## Installation

```bash
# Clone the repository
git clone https://github.com/istiak19/mongo-server-mongoose
cd mongo-server-mongoose

# Install dependencies
npm install
```

## Usage

Before starting the server, ensure you have a `.env` file in your root directory with the necessary environment variables, for example:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/your-db-name
```

### Development

Run the development server using:

```bash
npm run dev
```

This uses `ts-node-dev` for automatic reload on code changes.

## Features

* ⚡ Express 5.x for modern middleware routing
* 🛡️ CORS support for cross-origin requests
* 🔐 Password hashing with `bcryptjs`
* 🌱 Environment variable support with `dotenv`
* 📦 MongoDB integration via Mongoose
* 🔁 Hot-reloading in development with `ts-node-dev`
* 📘 Fully written in TypeScript

## Dependencies

### Runtime

* `express@^5.1.0`
* `mongoose@^8.16.0`
* `bcryptjs@^3.0.2`
* `cors@^2.8.5`
* `dotenv@^16.5.0`

### Dev

* `typescript@^5.8.3`
* `ts-node-dev@^2.0.0`
* `@types/express`
* `@types/cors`

## Development Scripts

* `npm run dev`: Start the development server with hot reloading
* `npm test`: Placeholder test command

## Configuration

Configuration values such as the server port and MongoDB URI should be defined in a `.env` file.

Example:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/test
```

## Troubleshooting

* **MongoDB not connecting**: Ensure the `MONGO_URI` in your `.env` file is correct and your MongoDB server is running.
* **CORS errors**: Verify CORS settings if accessing from a frontend app.
* **TypeScript errors**: Make sure all required types are installed (`@types/express`, `@types/cors`).