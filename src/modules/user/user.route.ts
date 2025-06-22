import { Router } from "express";
import { deleteUser, getAllUser, getSingleUser, registerUser, updateUser } from "./user.controller";

const userRouter = Router();

userRouter.get("/user-get", getAllUser);
userRouter.get("/user-single/:id", getSingleUser);
userRouter.post("/user-create", registerUser);
userRouter.patch("/user-update/:id", updateUser);
userRouter.delete("/user-delete/:id", deleteUser);

export default userRouter;