import  express, { NextFunction, Request, Response }  from "express";
import multer from "multer"
import { Authorization } from "../middlewares/authorization.middleware";
import { plainToClass } from "class-transformer";
import { BookDTO } from "./contrat/dtos/Upload_book.dto";
import { findUserFromToken } from "../auth/auth.service";
import {AddBook} from "../book/book.service";

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
    const bookDTO = plainToClass(BookDTO, req.body, { excludeExtraneousValues: true } );
    const token = req.headers.authorization?.split(' ')[1]
    const createdById = await findUserFromToken(token as string);
    bookDTO.createdById = createdById;
    bookDTO.title = bookDTO.title || req.file?.originalname || ""
    if (typeof bookDTO.year === 'string') {
      bookDTO.year = parseInt(bookDTO.year);
    }
    await AddBook(bookDTO);
    res.json({ message: 'File uploaded successfully!' });
})