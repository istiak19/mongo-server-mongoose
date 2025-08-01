"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const userRouter = (0, express_1.Router)();
userRouter.get("/user-get", user_controller_1.getAllUser);
userRouter.get("/user-single/:id", user_controller_1.getSingleUser);
userRouter.post("/user-create", user_controller_1.registerUser);
userRouter.patch("/user-update/:id", user_controller_1.updateUser);
userRouter.delete("/user-delete/:id", user_controller_1.deleteUser);
exports.default = userRouter;
