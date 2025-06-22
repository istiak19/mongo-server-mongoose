import { Model } from "mongoose"

export interface IUser {
    name: string,
    email: string,
    phone: string,
    password: string,
    role: "admin" | "customer"
};

export interface userMethods extends Model<IUser> {
    hashPassword(password: string): string
}