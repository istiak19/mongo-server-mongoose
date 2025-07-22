import { Types } from "mongoose"

export interface IMongo {
    name: string,
    variety: string,
    price: number,
    unit: "KG" | "TON"
    stock: number,
    origin: string,
    session: "Summer" | "Winter",
    user: Types.ObjectId
};