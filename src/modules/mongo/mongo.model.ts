import { model, Schema } from "mongoose";
import { IMongo } from "./mongo.interface";

const mongoScheme = new Schema<IMongo>({
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
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});


export const Mongo = model<IMongo>("mongo", mongoScheme);