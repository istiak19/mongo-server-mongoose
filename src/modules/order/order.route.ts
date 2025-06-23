import { Router } from "express";
import { getAllOrder, orderPost } from "./order.controller";

const orderRouter = Router();

orderRouter.get("/get-order", getAllOrder);
orderRouter.post("/create-order", orderPost);

export default orderRouter;