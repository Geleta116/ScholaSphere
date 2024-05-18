import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET as string;
export function generateAccessToken(user: any) {
    return jwt.sign({ userId: user.id }, jwtSecret, {
      expiresIn: '2h',
    });
  }
 
  export function generateRefreshToken(user: any, jti: any) {
    return jwt.sign({
      userId: user.id,
      id: jti
    }, jwtSecret, {
      expiresIn: '4h',
    });
  }
  
  export function generateTokens(user: any, jti: any) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user, jti);
  
    return {
      accessToken,
      refreshToken,
    };
  }
  
  module.exports = {
    generateAccessToken,
    generateRefreshToken,
    generateTokens
  };