import { Router } from "express";
import { getAllUser, registerUser } from "./user.controller";

const userRouter = Router();

userRouter.get("/user-get", getAllUser);
userRouter.post("/user-create", registerUser);

export default userRouter;