import type { Request, Response } from "express";
import * as UserService from "./users.service";
import { Req } from "@/utils/req";
import { plainToClass } from "class-transformer";
import { UpdateUserDto } from "./dtos/updateUser.dto";


interface User {
  firstName: string,
  middleName: string,
  email: string,
  password: string,
  phonenumber: string | undefined,
  profilepicture: string | undefined,
  description: string | undefined,
  userName: string

}
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
    return res.status(200).json(userProfile);
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
    const updateDto = plainToClass(UpdateUserDto, req.body);
    const userId =  req.params.id as string;
    console.log(userId,user.id, userId, user.roles, updateDto)
    const updatedUser = await UserService.updateProfile(user.id, user.roles, userId, updateDto);
    return res.status(200).json(updatedUser);
  } catch (error: any) {
    console.error("Error updating profile:", error);
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

