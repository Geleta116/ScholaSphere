// types.d.ts
import { JwtPayload } from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    userData?: string | JwtPayload;
  }
}
