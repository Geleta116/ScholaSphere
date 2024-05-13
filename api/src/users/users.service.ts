import {db} from "../utils/db.server";
import { Express } from "express";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";

type User = {
    email: string;
    name: string;
}
export const allUsers =  async (): Promise<User[]> => {
          return db.user.findMany({
            select:{
                id: true,
                name: true,  
                email: true
            }
            }
          )
}

export const FindUserByEmail =  async(email: string): Promise<User | null> => {
  return db.user.findUnique({
    where: {
      email,
    },
  });
}

export const CreateUser= async(user: any) => {
    user.password = bcrypt.hashSync(user.password, 12);
    return db.user.create({
      data: user
    })
}

export function findUserById(id: any) {
  return db.user.findUnique({
    where: {
      id,
    },
  });
}