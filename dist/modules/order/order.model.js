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
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const mongo_model_1 = require("../mongo/mongo.model");
const addressSchema = new mongoose_1.Schema({
    zipcode: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    }
}, {
    _id: false
});
const orderSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user"
    },
    mongo: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "mongo"
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    totalPrice: {
        type: Number,
        min: 0
    },
    status: {
        type: String,
        required: true
    },
    address: {
        type: addressSchema,
        required: true
    }
});
orderSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const mongoFind = yield mongo_model_1.Mongo.findById(this.mongo);
        console.log("pre doc", mongoFind);
        if (!mongoFind) {
            throw new Error("Mongo not found");
        }
        ;
        this.totalPrice = mongoFind.price * this.quantity;
    });
});
orderSchema.statics.checkStock = function (id, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield mongo_model_1.Mongo.findById(id);
        if (!product)
            throw new Error("Product not found");
        if (!product.stock || product.stock < quantity) {
            throw new Error("Insufficient stock");
        }
        return true;
    });
};
exports.Order = (0, mongoose_1.model)("order", orderSchema);
