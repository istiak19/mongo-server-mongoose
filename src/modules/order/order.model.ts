import { Model, model, Schema } from "mongoose";
import { IAddress, IOrder, orderStaticMethod } from "./order.interface";
import { Mongo } from "../mongo/mongo.model";

const addressSchema = new Schema<IAddress, Model<IOrder, {}, orderStaticMethod>>({
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

const orderSchema = new Schema<IOrder>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    mongo: {
        type: Schema.Types.ObjectId,
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

orderSchema.pre("save", async function () {
    const mongoFind = await Mongo.findById(this.mongo);
    console.log("pre doc", mongoFind);
    if (!mongoFind) {
        throw new Error("Mongo not found");
    };
    this.totalPrice = mongoFind.price * this.quantity;
});

orderSchema.statics.checkStock = async function (id: string, quantity: number): Promise<boolean> {
    const product = await Mongo.findById(id);
    if (!product) throw new Error("Product not found");

    if (!product.stock || product.stock < quantity) {
        throw new Error("Insufficient stock");
    }
    return true;
};


export const Order = model<IOrder, orderStaticMethod>("order", orderSchema);

