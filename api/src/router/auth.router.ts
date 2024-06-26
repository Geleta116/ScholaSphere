
import { signup, Login, RefreshToken } from "../auth/auth.controller";
import { CreateUserSchema } from "../auth/contract/schema/CreateUserSchema";
import { GenericValidator } from "../middlewares/validation.middleware";
import Express from "express";


export const AuthRouter = Express.Router();

AuthRouter.post("/sign-up", GenericValidator(CreateUserSchema),signup)
AuthRouter.post("/login", Login);
AuthRouter.post("token", RefreshToken )