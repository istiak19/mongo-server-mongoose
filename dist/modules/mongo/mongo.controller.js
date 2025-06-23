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
exports.deleteMongo = exports.updateMongo = exports.createMongo = exports.getSingleMongo = exports.getAllMongo = void 0;
const mongo_model_1 = require("./mongo.model");
const getAllMongo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield mongo_model_1.Mongo.find().populate("user", "name email phone");
        res.status(200).json({
            success: true,
            message: "Mango retrieved successfully!",
            data: data,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve mango",
            error,
        });
    }
});
exports.getAllMongo = getAllMongo;
const getSingleMongo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = yield mongo_model_1.Mongo.findOne({ _id: id });
        res.status(200).json({
            success: true,
            message: 'Mongo retrieved successfully',
            data: data,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve mongo',
            error,
        });
    }
});
exports.getSingleMongo = getSingleMongo;
const createMongo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mongoInfo = req.body;
        const data = new mongo_model_1.Mongo(mongoInfo);
        yield data.save();
        res.status(201).json({
            success: true,
            message: "Mango created successfully!",
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
            message: "Failed to create mango",
            error,
        });
    }
});
exports.createMongo = createMongo;
const updateMongo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const updateInfo = req.body;
        const data = yield mongo_model_1.Mongo.findOneAndUpdate({ _id: id }, updateInfo, { new: true, runValidators: true });
        res.status(200).json({
            success: true,
            message: 'Mongo updated successfully',
            data: data,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update mongo',
            error,
        });
    }
});
exports.updateMongo = updateMongo;
const deleteMongo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = yield mongo_model_1.Mongo.findOneAndDelete({ _id: id });
        res.status(200).json({
            success: true,
            message: "Mongo deleted successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete Mongo",
            error,
        });
    }
});
exports.deleteMongo = deleteMongo;
