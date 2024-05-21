import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import { JsonArray } from "@prisma/client/runtime/library";
export const GenericValidator = (schema: ZodSchema<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = await schema.safeParse(req.body);

    if (result.success) {
      next();
    } else {
      const errorDetails = result.error.errors.map((err) => ({
        path: err.path,
        message: err.message,
      }));
      return res.status(400).json({ errors: errorDetails });
    }
  };
};
