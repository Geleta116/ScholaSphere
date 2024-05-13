import { Request, Response } from "express";

const jwt = require("jsonwebtoken");
module.exports = (req: Request, res: Response, next: any) => {
    try {
        const token = req.headers.authorization ? req.headers.authorization.replace("Bearer ", "") : "";
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Authentification Failed"
        });
    }
};