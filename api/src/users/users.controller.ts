import type { Request, Response } from "express";
import * as UserService from "./users.service";
import { Req } from "@/utils/req";
import { plainToClass } from "class-transformer";
import { UpdateBookDto } from "@/book/contrat/dtos/Update_book.dto";

export const GetAllUserController = async (
  request: Req,
  response: Response
) => {
  try {
    const users = await UserService.allUsers();
    return response.status(200).json(users);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
};

export const GetProfileController = async (
  req: Req,
  res: Response
) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).send("Unauthenticated");
    }
    const userProfile = await UserService.getProfile(user.id);
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
}

export const DeleteUserController = async (
  request: Req,
  response: Response
) => {
  try {
    const user = await UserService.deleteUser(request.body.id);
    return response.status(200).json(user);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
}

export const UpdateProfileController = async (
  req: Req,
  res: Response
) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).send("Unauthenticated");
    }
    const updateDto = plainToClass(UpdateBookDto, req.body);
    const updatedUser = await UserService.updateProfile(user.id, user.roles, req.body.id, updateDto);
    return res.status(200).json(updatedUser);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
}

export const PromoteToAdminController = async (
  request: Req,
  response: Response
) => {
  try {
    const user = await UserService.promoteToAdmin(request.body.id);
    return response.status(200).json(user);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
}

