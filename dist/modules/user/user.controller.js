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
exports.deleteUser = exports.updateUser = exports.registerUser = exports.getSingleUser = exports.getAllUser = void 0;
const user_model_1 = require("./user.model");
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield user_model_1.User.find();
        res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            data: data,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve users',
            error,
        });
    }
});
exports.getAllUser = getAllUser;
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = yield user_model_1.User.findOne({ _id: id });
        res.status(200).json({
            success: true,
            message: 'User retrieved successfully',
            data: data,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve user',
            error,
        });
    }
});
exports.getSingleUser = getSingleUser;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInfo = req.body;
        const user = new user_model_1.User(userInfo);
        const password = yield user.hashPassword(userInfo.password);
        user.password = password;
        yield user.save();
        res.status(201).json({
            success: true,
            message: "User registered successfully!",
            data: user,
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
            message: "Failed to register user",
            error,
        });
    }
});
exports.registerUser = registerUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const updateInfo = req.body;
        const data = yield user_model_1.User.findOneAndUpdate({ _id: id }, updateInfo, { new: true });
        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: data,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update user',
            error,
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = yield user_model_1.User.findOneAndDelete({ _id: id });
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete user",
            error,
        });
    }
});
exports.deleteUser = deleteUser;
