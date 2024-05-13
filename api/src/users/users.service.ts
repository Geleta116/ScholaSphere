import {db} from "../utils/db.server";
import { Express } from "express";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";

type User = {
    email: string;
    name: string;
    phonenumber: string;
}
export const allUsers =  async (): Promise<User[]> => {
          return db.user.findMany({
            select:{
                id: true,
                name: true,  
                phonenumber: true,
                email: true
            }
            }
          )
}

export const FindUserByEmail =  async(): Promise<User | null> => {
  return db.user.findFirst({
    select:{
      id: true,
      name: true,  
      phonenumber: true,
      email: true
  }
  });
}

export const CreateUserByEmailAndPassword= async(user: any) => {
    user.password = bcrypt.hashSync(user.password, 12);
    return db.user.create({
      data: user
    })
}

export function findUserById(id) {
  return db.user.findUnique({
    where: {
      id,
    },
  });
}