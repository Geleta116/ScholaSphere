import { Request } from "express";

export interface Req extends Request {
  user?: {
    id: string;
    roles: string[];
  };
  token?: string;
}
