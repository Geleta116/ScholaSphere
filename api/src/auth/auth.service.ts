import { db } from "../utils/db.server";
import hashToken from "../utils/hashToken";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

interface DecodedToken {
  userId: string;
  [key: string]: any;
}

interface Role {
  role: {
    name: string;
    id: string;
  };
}

export function addRefreshTokenToWhitelist({
  jti,
  refreshToken,
  userId,
}: {
  jti: string;
  refreshToken: string;
  userId: string;
}) {
  return db.refreshToken.create({
    data: {
      id: jti,
      hashedToken: hashToken(refreshToken),
      userId,
    },
  });
}

export function findRefreshTokenById(id: any) {
  return db.refreshToken.findUnique({
    where: {
      id,
    },
  });
}

export function deleteRefreshToken(id: any) {
  return db.refreshToken.update({
    where: {
      id,
    },
    data: {
      revoked: true,
    },
  });
}

export function revokeTokens(userId: any) {
  return db.refreshToken.updateMany({
    where: {
      userId,
    },
    data: {
      revoked: true,
    },
  });
}

export async function refreshTokenService(refreshToken: string) {
  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET as string
    ) as jwt.JwtPayload;
    await deleteRefreshToken(decoded.jti);
    return decoded.userId;
  } catch (e) {
    const decoded = jwt.decode(refreshToken) as jwt.JwtPayload | null;

    if (decoded) {
      await revokeTokens(decoded.userId);
      return decoded.userId;
    } else {
      throw new Error("Invalid token");
    }
  }
}

export async function findUserFromToken(authToken: string) {
  let decoded = jwt.decode(authToken) as jwt.JwtPayload | null;
  if (decoded) return decoded.userId;
  else throw new Error("Invalid token");
}

export const findRoleFromToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (!decoded) {
      throw new Error("un authenticated");
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
      throw new Error("User not found");
    }

    const userRoles = user.roles.map((role: Role) => role.role.name);

    return userRoles;
  } catch (e) {
    throw new Error("Internal server error");
  }
};

module.exports = {
  addRefreshTokenToWhitelist,
  findRefreshTokenById,
  deleteRefreshToken,
  revokeTokens,
  refreshTokenService,
  findUserFromToken,
  findRoleFromToken,
};
