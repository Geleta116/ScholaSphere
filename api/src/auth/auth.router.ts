import Express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {v4 as uuidv4} from "uuid";

import { FindUserByEmail, CreateUser, findUserById } from "../users/users.service";
import {generateTokens} from "../utils/jwt";
import hashTokens from "../utils/hashToken";
import { addRefreshTokenToWhitelist, findRefreshTokenById, deleteRefreshToken, revokeTokens, refreshTokenService } from "./auth.service";
import { Module } from "module";


export const authRouter = Express.Router();


authRouter.post("/sign-up", async (req: Request, res: Response
    , next: any
) => {
    try {
        const { email, password, name } = req.body;
        if (!email || !password) {
          res.status(400);
          throw new Error('You must provide an email and a password.');
        }
    
        const existingUser = await FindUserByEmail(email);
    
        if (existingUser) {
          res.status(400);
          throw new Error('Email already in use.');
        }
    
        const user = await CreateUser({ email, password , name});
        const jti = uuidv4();
        const { accessToken, refreshToken } = generateTokens(user, jti);
        await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });
        res.cookie('access_token', accessToken, { httpOnly: true });
        res.cookie('refresh_token', refreshToken, { httpOnly: true });
        res.json({
          accessToken,
          refreshToken
        });
      } catch (err) {
        next(err);
      }
})

authRouter.post("/login", async (req: Request, res: Response, next: any) => {
    try{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("you must provide an email and a password");
    }
    const existingUser = await FindUserByEmail(email);
    if (!existingUser){
        res.status(403);
        throw new Error('Invalid login credentials.');
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      res.status(403);
      throw new Error('Invalid login credentials.');
    }

    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(existingUser, jti);
    await addRefreshTokenToWhitelist({ jti, refreshToken, userId: existingUser.id });
    res.cookie('access_token', accessToken, { httpOnly: true });
    res.cookie('refresh_token', refreshToken, { httpOnly: true });
    res.json({
        accessToken,
        refreshToken
      });
    

} catch (err) {
    next(err);
  }}
)
authRouter.post('/token', async (req: Request, res: Response, next: NextFunction) => {
  const IncomingRefreshToken = req.headers['refresh_token'] as string;
  if (!IncomingRefreshToken) {
    res.status(400).json({ error: 'Refresh Token not provided' });
    return;
  }
  try {
    let userId = await refreshTokenService(IncomingRefreshToken);
    let jti = uuidv4();
    let { accessToken, refreshToken } = generateTokens(userId, jti);
    await addRefreshTokenToWhitelist({ jti, refreshToken, userId });
    res.cookie('access_token', accessToken, { httpOnly: true });
    res.cookie('refresh_token', refreshToken, { httpOnly: true });

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: 'Server error' });
  }
});
function session(arg0: {
  secret: string; // Specify a secret for signing the session ID cookie
  resave: boolean; saveUninitialized: boolean;
}): any {
  throw new Error("Function not implemented.");
}

