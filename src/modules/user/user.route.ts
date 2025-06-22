import { Router } from "express";
import { getAllUser, getSingleUser, registerUser } from "./user.controller";

const userRouter = Router();

userRouter.get("/user-get", getAllUser);
userRouter.get("/user-single/:id", getSingleUser);
userRouter.post("/user-create", registerUser);

export default userRouter;