import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization ? req.headers.authorization.replace("Bearer ", "") : "";
        if (!token) {
            return res.status(401).json({ message: "Authentication Failed" });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.userData = decoded; 
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Authentication Failed"
        });
    }
}
