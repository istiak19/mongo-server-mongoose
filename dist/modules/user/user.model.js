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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongo_model_1 = require("../mongo/mongo.model");
const userSchema = new mongoose_1.Schema({
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
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: (props) => `${props.value} is not a valid email address!`
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
            validator: function (v) {
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
userSchema.method("hashPassword", function (plainPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const password = yield bcryptjs_1.default.hash(plainPassword, 10);
        return password;
    });
});
userSchema.post("findOneAndDelete", function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        if (doc) {
            // console.log("Deleted User:", doc);
            yield mongo_model_1.Mongo.deleteMany({ user: doc._id });
        }
    });
});
exports.User = (0, mongoose_1.model)("user", userSchema);
