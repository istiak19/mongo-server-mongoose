import { Request, Response } from "express";
import { User } from "./user.model";

export const getAllUser = async (req: Request, res: Response) => {
    try {
        const data = await User.find();
        res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve users',
            error,
        });
    }
};

export const getSingleUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const data = await User.findOne({ _id: id });
        res.status(200).json({
            success: true,
            message: 'User retrieved successfully',
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve user',
            error,
        });
    }
}

export const registerUser = async (req: Request, res: Response) => {
    try {
        const userInfo = req.body;
        const user = new User(userInfo);
        const password = await user.hashPassword(userInfo.password);
        user.password = password;
        await user.save();
        res.status(201).json({
            success: true,
            message: "User registered successfully!",
            data: user,
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
            message: "Failed to register user",
            error,
        });
    }
};