import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, "Email is required"]
    },
    phone: {
        type: String,
        unique: true,
        required: [true, "Number is required"],
        maxlength: 11
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ["admin", "customer"],
        lowercase: true,
        default: "customer"
    }
}, {
    versionKey: false,
    timestamps: true
});

export const User = model<IUser>("user", userSchema);