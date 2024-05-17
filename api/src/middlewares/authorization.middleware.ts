import { Request, Response, NextFunction } from "express"
import jwt  from "jsonwebtoken";
import * as dotenv from "dotenv";
import {db} from "../utils/db.server";
dotenv.config();

interface DecodedToken {
    userId: string;
    [key: string]: any; // for any other properties in the token
  }
  
export const adminAuthorization = (roles: string[]) =>{
    return async (req: Request, res: Response, next: NextFunction) =>{
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token){
            return res.status(401).json({ message: 'unauthorized'});
        }
        
        try{
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
           
            if (!decoded) {
                console.log(decoded)
                return res.status(401).json({ message: 'Authentication Failed' });
            }
            console.log(decoded)
            const newDecod =  jwt.decode(token) as DecodedToken;
            
            const user = await db.user.findUnique({
                where: { id: newDecod.userId},
                include: { roles: { include: {
                    role: true,
                  }, },}
            });

            if (!user) {
                return res.status(401).json({ message: 'User not found' });
              }
        
              const userRoles = user.roles.map(role => role.role.name);
              const hasRole = roles.some(role => userRoles.includes(role));
        
              if (!hasRole) {
                return res.status(403).json({ message: 'Forbidden' });
              }
        
              next();
        } catch(e){
            return res.status(401).json({
                message: "Authentication Failed"

        });
    }
}
}
