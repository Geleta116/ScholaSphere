import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { db } from "../utils/db.server";
import { Req } from "@/utils/req";
dotenv.config();

interface DecodedToken {
  userId: string;
  [key: string]: any;
}

interface Role {
  role: {
    name: string;
    id: string; // Assuming 'name' is of type string
  };
}

export const Authorization = (roles: string[]) => {
  return async (req: Req, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthenticated" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

      if (!decoded) {
        return res.status(401).json({ message: "Authentication Failed" });
      }

      const newDecod = jwt.decode(token) as DecodedToken;

      const user = await db.user.findUnique({
        where: { id: newDecod.userId },
        include: {
          roles: {
            include: {
              role: true,
            },
          },
        },
      });

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      const userRoles = user.roles.map((role : Role) => role.role.name);
      const hasRole = roles.some((role) => userRoles.includes(role));

      if (!hasRole) {
        return res.status(403).json({ message: "Forbidden" });
      }

      req.user = {
        id: user.id,
        roles: userRoles,
      };
      req.token = token;

      next();
    } catch (e) {
      return res.status(401).json({ message: "Authentication Failed" });
    }
  };
};
