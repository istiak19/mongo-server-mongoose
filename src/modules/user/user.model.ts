import { Model, model, Schema } from "mongoose";
import { IUser, userMethods } from "./user.interface";
import bcrypt from "bcryptjs";
import { Mongo } from "../mongo/mongo.model";

const userSchema = new Schema<IUser, userMethods>({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, "Email is required"],
        validate: {
            validator: function (v: string) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: (props: any) => `${props.value} is not a valid email address!`
        }
    },
    phone: {
        type: String,
        unique: true,
        required: [true, "Number is required"],
        min: [11, 'Must be at least 6, got {VALUE}'],
        maxlength: 11,
        trim: true,
        immutable: true,
        validate: {
            validator: function (v: any) {
                return /^(01)[0-9]{9}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
    },
    password: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        enum: {
            values: ["admin", "customer"],
            message: '{VALUE} is not supported'
        },
        lowercase: true,
        default: "customer"
    }
}, {
    versionKey: false,
    timestamps: true
});

userSchema.method("hashPassword", async function (plainPassword: string) {
    const password = await bcrypt.hash(plainPassword, 10);
    return password;
});

userSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    // console.log("Deleted User:", doc);
    await Mongo.deleteMany({ userID: doc._id });
  }
});

export const User = model<IUser, Model<IUser, {}, userMethods>>("user", userSchema);