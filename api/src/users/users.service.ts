import { db } from "../utils/db.server";
import { Express } from "express";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UpdateUserDto } from "./dtos/updateUser.dto";

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

export const FindUserByUserName = async (
  userName: string
): Promise<User | null> => {
  return db.user.findUnique({
    where: {
      userName: userName,
    },
  });
};

export const CreateUser = async (user: any) => {
  user.password = bcrypt.hashSync(user.password, 12);

  const {
    firstName,
    lastName,
    userName,
    email,
    password,
    roles = ["user"],
  } = user;

  const createdUser = await db.user.create({
    data: {
      email,
      password,
      firstName,
      lastName,
      userName,
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

type Role = {
  role: {
    name: string;
  };
};

export async function getProfile(id: string) {
  // Fetch the user data including nested roles
  const user = await db.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      userName: true,
      phonenumber: true,
      description: true,
      profilepicture: true,
      
      roles: {
        select: {
          role: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (user) {
    // Transform roles to a simple list of role names
    user.roles = user.roles.map((r: Role) => r.role.name);
  }

  return user;
}


export async function deleteUser(id: string) {

  const userToDelete = await db.user.findFirst({
    where: {
      id,
    }
  })

  if (!userToDelete) {
    throw new Error("User doesn't Exist")
  }

  return db.user.delete({
    where: {
      id,
    },
  });
}



export async function updateProfile(
  loggedInUserid: string,
  roles: string[],
  IdOfUserToBeUpdated: string,
  data: Partial<UpdateUserDto>
) {
  if (loggedInUserid !== IdOfUserToBeUpdated && !roles.includes("admin")) {
    throw new Error("Unauthorized");
  }

  const userExists = await db.user.findUnique({
    where: { id: IdOfUserToBeUpdated },
  });

  if (!userExists) {
    throw new Error("User not found");
  }

  return db.user.update({
    where: { id: IdOfUserToBeUpdated },
    data: { ...data },
  });
}




export async function promoteToAdmin(id: string) {
  const adminRole = await db.role.findUnique({
    where: {
      name: "admin",
    },
  });

  if (!adminRole) {
    throw new Error("Admin role not found");
  }

  return db.user.update({
    where: {
      id,
    },
    data: {
      roles: {
        set: [{ userId_roleId: { userId: id, roleId: adminRole.id } }],
      },
    },
  });
}
