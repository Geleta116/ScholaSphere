import { Authorization } from "../middlewares/authorization.middleware";
import { GetAllUserController } from "../users/users.controller";
import express from "express";


export const UserRouter = express.Router();

UserRouter.get(  "/get-all",
    Authorization(["admin"]),
    GetAllUserController
)


UserRouter.get(  "/get-profile  ",
    Authorization(["admin"]),
    GetAllUserController
)

UserRouter.get(  "/delete-user",
    Authorization(["admin"]),
    GetAllUserController
)

UserRouter.get(  "/update-profile",
    Authorization(["admin"]),
    GetAllUserController
)

UserRouter.get(  "/promot-to-admin",
    Authorization(["admin"]),
    GetAllUserController
)