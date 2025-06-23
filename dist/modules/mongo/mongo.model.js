"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mongo = void 0;
const mongoose_1 = require("mongoose");
const mongoScheme = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Name is required"]
    },
    variety: {
        type: String,
        trim: true,
        required: [true, "Variety is required"]
    },
    unit: {
        type: String,
        enum: ["KG", "TON"],
        default: "KG"
    },
    price: {
        type: Number,
        min: 0
    },
    stock: {
        type: Number,
        required: true,
        min: 1
    },
    origin: {
        type: String,
        trim: true,
        required: [true, "Origin is required"]
    },
    session: {
        type: String,
        enum: ["Summer", "Winter"]
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.Mongo = (0, mongoose_1.model)("mongo", mongoScheme);
