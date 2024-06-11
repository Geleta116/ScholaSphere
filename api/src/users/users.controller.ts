import type { Request, Response } from "express";
import * as UserService from "./users.service";


export const GetAllUserController = async (
  request: Request,
  response: Response
) => {
  try {
    const users = await UserService.allUsers();
    return response.status(200).json(users);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
};
