import { Authorization } from "../middlewares/authorization.middleware";
import { DeleteUserController, GetAllUserController, GetProfileController, PromoteToAdminController, UpdateProfileController } from "../users/users.controller";
import express from "express";


export const UserRouter = express.Router();

UserRouter.get(  "/get-all",
    Authorization(["admin"]),
    GetAllUserController
)

UserRouter.get(  "/get-profile",
    Authorization(["user","admin"]),
    GetProfileController
)

UserRouter.delete(  "/delete-user/:id",
    Authorization(["admin"]),
    DeleteUserController
)

UserRouter.patch(  "/update-profile/:id",
    Authorization(["admin"]),
    UpdateProfileController
)

UserRouter.patch(  "/promot-to-admin/:id",
    Authorization(["admin"]),
    PromoteToAdminController
)