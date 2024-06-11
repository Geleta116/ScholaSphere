import { Authorization } from "../middlewares/authorization.middleware";
import { GetAllUserController } from "../users/users.controller";
import express from "express";


export const UserRouter = express.Router();

UserRouter.get(  "/get-all",
    Authorization(["admin"]),
    GetAllUserController
)