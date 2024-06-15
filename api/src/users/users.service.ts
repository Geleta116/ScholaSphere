import { db } from "../utils/db.server";
import { Express } from "express";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";

type User = {
  id: any;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
};
export const allUsers = async (): Promise<User[]> => {
  return db.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      userName: true,
      email: true,
      password: true,
    },
  });
};

export const FindUserByEmail = async (email: string): Promise<User | null> => {
  return db.user.findUnique({
    where: {
      email,
    },
  });
};

export const CreateUser = async (user: any) => {
  user.password = bcrypt.hashSync(user.password, 12);

  const { firstName, lastName, userName, email, password, roles=["user"] } = user;

  const createdUser = await db.user.create({
    data: {
      email,
      password,
      firstName,
      lastName,
      userName
    },
  });

  await Promise.all(
    roles.map(async (roleName: string) => {
      const role = await db.role.findUnique({
        where: { name: roleName },
      });
      if (role) {
        await db.userRole.create({
          data: {
            userId: createdUser.id,
            roleId: role.id,
          },
        });
      }
    })
  );
  return createdUser;
};

export function findUserById(id: string) {
  return db.user.findUnique({
    where: {
      id,
    },
  });
}
