import {db} from "../utils/db.server";
import hashToken from "../utils/hashToken";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";


dotenv.config();

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
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET as string) as jwt.JwtPayload;
    await deleteRefreshToken(decoded.jti);
    return decoded.userId;
  } catch (e) {
    
    const decoded = jwt.decode(refreshToken) as jwt.JwtPayload | null;
     
    if (decoded) {
      await revokeTokens(decoded.userId);
      return decoded.userId;
    } else {
      throw new Error('Invalid token');
    }
  }
}


export async function findUserFromToken(authToken: string){
  let decoded = jwt.decode(authToken) as jwt.JwtPayload | null;
  if(decoded) return decoded.userId;
  else throw new Error('Invalid token');
}

  
  module.exports = {
    addRefreshTokenToWhitelist,
    findRefreshTokenById,
    deleteRefreshToken,
    revokeTokens,
    refreshTokenService,
    findUserFromToken
  };