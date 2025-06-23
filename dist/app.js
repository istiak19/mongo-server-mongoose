"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./modules/user/user.route"));
const mongo_route_1 = __importDefault(require("./modules/mongo/mongo.route"));
const order_route_1 = __importDefault(require("./modules/order/order.route"));
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use("/api", user_route_1.default);
exports.app.use("/api", mongo_route_1.default);
exports.app.use("/api", order_route_1.default);
exports.app.get("/", (req, res) => {
    res.send("Welcome to the Mongo Server!");
});
