import { Request, Response } from "express";
import { Order } from "./order.model";

export const getAllOrder = async (req: Request, res: Response) => {
    try {
        const data = await Order.find().populate("user","name email phone").populate("mongo","name origin price");
        res.status(200).json({
            success: true,
            message: "Order retrieved successfully!",
            data: data,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve order",
            error,
        });
    }
};

export const orderPost = async (req: Request, res: Response) => {
    try {
        const orderInfo = req.body;
        const data = new Order(orderInfo);
        await data.save();
        res.status(201).json({
            success: true,
            message: "Order created successfully!",
            data: data,
        });
    } catch (error: any) {
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

};