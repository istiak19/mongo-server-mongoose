import { Model, Types } from "mongoose";

export interface IAddress {
    zipcode: string,
    state: string,
    country: string,
    street: string
}

export interface IOrder {
    user: Types.ObjectId,
    mongo: Types.ObjectId,
    quantity: number,
    totalPrice: number,
    status: string,
    address: IAddress;
};

export interface orderStaticMethod extends Model<IOrder> {
    checkStock(id: string, quantity: number): Promise<any>;
};