import { Request, Response } from "express";
import { Mongo } from "./mongo.model";

export const getAllMongo = async (req: Request, res: Response) => {
    try {
        const data = await Mongo.find().populate("user", "name email phone");
        res.status(200).json({
            success: true,
            message: "Mango retrieved successfully!",
            data: data,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve mango",
            error,
        });
    };
};

export const getSingleMongo = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const data = await Mongo.findOne({ _id: id });
        res.status(200).json({
            success: true,
            message: 'Mongo retrieved successfully',
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve mongo',
            error,
        });
    }
};

export const createMongo = async (req: Request, res: Response) => {
    try {
        const mongoInfo = req.body;
        const data = new Mongo(mongoInfo);
        await data.save();
        res.status(201).json({
            success: true,
            message: "Mango created successfully!",
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
            message: "Failed to create mango",
            error,
        });
    }
};

export const updateMongo = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const updateInfo = req.body;
        const data = await Mongo.findOneAndUpdate({ _id: id }, updateInfo, { new: true, runValidators: true })
        res.status(200).json({
            success: true,
            message: 'Mongo updated successfully',
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update mongo',
            error,
        });
    }
};

export const deleteMongo = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const data = await Mongo.findOneAndDelete({ _id: id });
        res.status(200).json({
            success: true,
            message: "Mongo deleted successfully",
            data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete Mongo",
            error,
        });
    }
};