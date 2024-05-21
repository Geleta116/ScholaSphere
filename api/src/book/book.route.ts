import express, { NextFunction, Request, Response } from "express";
import multer from "multer";
import { Authorization } from "../middlewares/authorization.middleware";
import { plainToClass } from "class-transformer";
import { BookDTO } from "./contrat/dtos/Upload_book.dto";
import { findUserFromToken } from "../auth/auth.service";
import {
  AddBook,
  DeleteBookById,
  GetApprovedBooks,
  GetBookById,
  GetFilteredBooks,
} from "../book/book.service";
import { BookSchema } from "./contrat/validators/schema/book.schema";
import { GenericValidator } from "../middlewares/validation.middleware";

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
export const bookRouter = express.Router();

export interface BookFilters {
  year?: number;
  department?: string;
  course?: string;
}

bookRouter.post(
  "/upload",
  Authorization(["user", "admin"]),
  upload.single("file"),
  GenericValidator(BookSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const bookDTO = plainToClass(BookDTO, req.body, {
      excludeExtraneousValues: true,
    });
    const token = req.headers.authorization?.split(" ")[1];
    const createdById = await findUserFromToken(token as string);
    bookDTO.createdById = createdById;
    bookDTO.title = bookDTO.title || req.file?.originalname || "";
    if (typeof bookDTO.year === "string") {
      bookDTO.year = parseInt(bookDTO.year);
    }
    await AddBook(bookDTO);
    res.json({ message: "File uploaded successfully!" });
  }
);

bookRouter.get(
  "/filter-book",
  Authorization(["user", "admin"]),
  async (req: Request, res: Response, next: NextFunction) => {
    const { year, department, course } = req.query;
    const filter: BookFilters = {};
    if (year) filter.year = parseInt(year as string);
    if (department) filter.department = department as string;
    if (course) filter.course = course as string;

    try {
      const books = await GetFilteredBooks(filter);
      return res.status(200).json({ books });
    } catch (e) {
      return res.status(500).send("Internal server error");
    }
  }
);

bookRouter.get(
  "/get-book-by-id",
  Authorization(["user", "admin"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.query.id as string;
      const book = await GetBookById(id);
      return res.status(200).json(book);
    } catch (e) {
      return res.status(500).send("Internal server error");
    }
  }
);

bookRouter.delete(
  "/delete-book",
  Authorization(["Admin"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const toBeDeletedId = req.query.id as string;
      const DeletedBook = await DeleteBookById(toBeDeletedId);
      return res.status(204).json(DeletedBook);
    } catch (e) {
      return res.status(500).send("Internal server error");
    }
  }
);

bookRouter.get(
  "/get-approved-books",
  Authorization(["user", "admin"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const books = await GetApprovedBooks();
      return res.status(200).json(books);
    } catch (e) {
      return res.status(500).send("Internal server error");
    }
  }
);
