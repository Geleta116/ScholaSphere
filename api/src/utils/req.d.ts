import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        roles: string[];
      };
      token?: string;
    }
  }
}
