import cors from "cors";
import express, { Application, Request, Response } from "express";
import userRouter from "./modules/user/user.route";
import mongoRouter from "./modules/mongo/mongo.route";
import orderRouter from "./modules/order/order.route";

export const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api", userRouter);
app.use("/api", mongoRouter);
app.use("/api", orderRouter);

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to the Mongo Server!");
});