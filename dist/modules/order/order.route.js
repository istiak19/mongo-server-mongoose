"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
const orderRouter = (0, express_1.Router)();
orderRouter.get("/get-order", order_controller_1.getAllOrder);
orderRouter.post("/create-order", order_controller_1.orderPost);
exports.default = orderRouter;
