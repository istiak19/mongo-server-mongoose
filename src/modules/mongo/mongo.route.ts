import { Router } from "express";
import { createMongo, deleteMongo, getAllMongo, getSingleMongo, updateMongo } from "./mongo.controller";

const mongoRouter = Router();

mongoRouter.get("/get-mongo", getAllMongo);
mongoRouter.get("/get-mongo/:id", getSingleMongo);
mongoRouter.post("/create-mongo", createMongo);
mongoRouter.patch("/update-mongo/:id", updateMongo);
mongoRouter.delete("/delete-mongo/:id", deleteMongo);

export default mongoRouter;