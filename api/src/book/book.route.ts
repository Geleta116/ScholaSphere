import  express, { NextFunction, Request, Response }  from "express";
import multer from "multer"
import { Authorization } from "../middlewares/authorization.middleware";

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        cb(null, 'uploads/');
      },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });

const upload =  multer({storage: storage});
export const bookRouter = express.Router();


bookRouter.post("/upload", Authorization(['admin']), upload.single('file'), async (req: Request, res: Response, next: NextFunction) =>{
    res.json({ message: 'File uploaded successfully!' });
})