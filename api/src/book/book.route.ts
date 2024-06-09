import express, { NextFunction, Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";
import { Authorization } from "../middlewares/authorization.middleware";
import { plainToClass } from "class-transformer";
import { BookDTO } from "./contrat/dtos/Upload_book.dto";
import { findUserFromToken } from "../auth/auth.service";
import {
  AddBook,
  ApproveBook,
  DeleteBookById,
  GetApprovedBooks,
  GetBookById,
  GetFilteredBooks,
  UpdateBook,
} from "../book/book.service";
import { BookSchema } from "./contrat/schema/book.schema";
import { GenericValidator } from "../middlewares/validation.middleware";
import { UpdateBookSchema } from "./contrat/schema/updateBook.schema";
import { UpdateBookDto } from "./contrat/dtos/Update_book.dto";

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

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedMimeTypes = [
    "application/pdf",
    "text/plain",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only PDF, TXT, and DOCX files are allowed.")
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

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
  "/get-book-by-id/:id",
  Authorization(["user", "admin"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const book = await GetBookById(id);
      return res.status(200).json(book);
    } catch (e) {
      return res.status(500).send("Internal server error");
    }
  }
);

bookRouter.delete(
  "/delete-book/:id",
  Authorization(["user", "admin"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const toBeDeletedId = req.params.id as string;
      const currUserId = req.user?.id;
      const currUserRole = req.user?.roles;
      if (!currUserId || !currUserRole)
        return res.status(401).send("UnAuthorized");
      const DeletedBook = await DeleteBookById(
        toBeDeletedId,
        currUserId,
        currUserRole
      );
      return res.status(204).json({ DeletedBook });
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

bookRouter.put(
  "/update-book/:id",
  Authorization(["user", "admin"]),
  GenericValidator(UpdateBookSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const BookId = req.params.id;
      const user = req.user;
      if (!user) {
        return res.status(401).send("Unauthenticated");
      }
      const userData = { id: user.id, role: user.roles };
      const updateDto = plainToClass(UpdateBookDto, req.body);
      await UpdateBook(BookId, userData, updateDto);
      return res.status(204).send();
    } catch (e) {
      return res.status(500).send("Internal server error");
    }
  }
);

bookRouter.put(
  "/approve-book/:id",
  Authorization(["admin"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const BookId = req?.params.id;
      if(!BookId) return res.status(400).send("Please add BookId");
      await ApproveBook(BookId);
    } catch (e) {
      return res.status(500).send("internal server error");
    }
  }
);
