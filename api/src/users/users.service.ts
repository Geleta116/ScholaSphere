import { db } from "../utils/db.server";
import { Express } from "express";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";

type User = {
  id: any;
  email: string;
  name: string;
  password: string;
};
export const allUsers = async (): Promise<User[]> => {
  return db.user.findMany({
    select: {
      id: true,
      name: true,
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

  const { name, email, password, roles=["user"] } = user;

  const createdUser = await db.user.create({
    data: {
      email,
      password,
      name,
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
