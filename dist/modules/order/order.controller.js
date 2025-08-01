"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderPost = exports.getAllOrder = void 0;
const order_model_1 = require("./order.model");
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield order_model_1.Order.find().populate("user", "name email phone").populate("mongo", "name origin price");
        res.status(200).json({
            success: true,
            message: "Order retrieved successfully!",
            data: data,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve order",
            error,
        });
    }
});
exports.getAllOrder = getAllOrder;
const orderPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderInfo = req.body;
        const data = new order_model_1.Order(orderInfo);
        yield data.save();
        res.status(201).json({
            success: true,
            message: "Order created successfully!",
            data: data,
        });
    }
    catch (error) {
        if (error.name === "ValidationError") {
            res.status(400).json({
                success: false,
                message: "Validation failed",
                error: error.errors,
            });
        }
        res.status(500).json({
            success: false,
            message: "Failed to create order",
            error,
        });
    }
});
exports.orderPost = orderPost;
