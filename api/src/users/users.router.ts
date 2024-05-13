import {db} from "../utils/db.server";
import  express  from "express";
import type { Request, Response } from "express";
import {body, validationResult} from "express-validator";
import * as UserService from "./users.service";

export const userRouter = express.Router();

userRouter.get("/get-all", async (request: Request, response: Response) => {
 try {
    const users = await UserService.allUsers();
    return response.status(200).json(users);
 } catch(error: any){
    return response.status(500).json(error.message);
 }
} )