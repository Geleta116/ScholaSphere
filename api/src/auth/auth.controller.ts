import Express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import {
  FindUserByEmail,
  CreateUser,
  findUserById,
  FindUserByUserName,
} from "../users/users.service";
import { generateTokens } from "../utils/jwt";
import hashTokens from "../utils/hashToken";
import {
  addRefreshTokenToWhitelist,
  refreshTokenService,
} from "./auth.service";

export const signup = async (req: Request, res: Response, next: any) => {
  try {
    const { email, password, firstName, lastName, userName } = req.body;
    if (!email || !password) {
      res.status(400).send({ message: "please provide necessary credentials" });
    }

    let existingUser = await FindUserByEmail(email);
    if (!existingUser) {
      existingUser = await FindUserByUserName(userName);
    }
    if (existingUser) {
      res
        .status(400)
        .send({ message: "A user with this email already exists" });
    }

    const user = await CreateUser({
      email,
      password,
      firstName,
      lastName,
      userName,
      role: ["user"],
    });
    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(user, jti);
    await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });
    res.cookie("access_token", accessToken, { httpOnly: true });
    res.cookie("refresh_token", refreshToken, { httpOnly: true });
    res.json({
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

export const Login = async (req: Request, res: Response, next: any) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      res
        .status(400)
        .send({ message: "please provide both email and password" });
    }
    const existingUser = await FindUserByUserName(userName);
    if (!existingUser) {
      return res.status(403).send({ message: "Invalid Credentials" });
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      return res.status(403).send("Invalid Credentials");
    }

    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(existingUser, jti);
    await addRefreshTokenToWhitelist({
      jti,
      refreshToken,
      userId: existingUser.id,
    });
    res.cookie("access_token", accessToken, { httpOnly: true });
    res.cookie("refresh_token", refreshToken, { httpOnly: true });
    res.json({
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

export const RefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const IncomingRefreshToken = req.headers["refresh_token"] as string;
  if (!IncomingRefreshToken) {
    res.status(400).json({ message: "Refresh Token not provided" });
    return;
  }
  try {
    let userId = await refreshTokenService(IncomingRefreshToken);
    let jti = uuidv4();
    let { accessToken, refreshToken } = generateTokens(userId, jti);
    await addRefreshTokenToWhitelist({ jti, refreshToken, userId });
    res.cookie("access_token", accessToken, { httpOnly: true });
    res.cookie("refresh_token", refreshToken, { httpOnly: true });

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};
function session(arg0: {
  secret: string;
  resave: boolean;
  saveUninitialized: boolean;
}): any {
  throw new Error("Function not implemented.");
}
