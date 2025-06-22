import express, { Application, Request, Response } from "express";
import cors from "cors";
import userRouter from "./modules/user/user.route";

export const app: Application = express();
app.use(express.json())
app.use("/api", userRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome To Mongo Server!')
})