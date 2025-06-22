import { Server } from "http";
import mongoose from "mongoose";
import { app } from "./app";
import dotenv from "dotenv";
import { config } from "./config";
dotenv.config();

let server: Server;
const port = config.port;

async function main() {
    try {
        await mongoose.connect(config.mongoUrl);
        console.log("Successfully connected to MongoDB");

        server = app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1);
    }
};

main();