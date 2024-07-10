import {
  ApproveBookController,
  DeleteBookController,
  FilterBookController,
  GetApprovedBooksController,
  GetBookByIdController,
  GetYourApprovedBooksController,
  GetYourUnApprovedBooksController,
  UpdateBookController,
  UploadBookController,
} from "../book/book.controller";
import { BookSchema } from "../book/contrat/schema/book.schema";
import { UpdateBookSchema } from "../book/contrat/schema/updateBook.schema";
import { Authorization } from "../middlewares/authorization.middleware";
import { GenericValidator } from "../middlewares/validation.middleware";
import { Req } from "@/utils/req";
import express from "express";
import multer, { FileFilterCallback } from "multer";

export const BookRouter = express.Router();

const storage = multer.diskStorage({
  destination: (
    req: Req,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, "uploads/books/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (
  req: Req,
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

BookRouter.post(
  "/upload",
  Authorization(["user", "admin"]),
  upload.single("file"),
  GenericValidator(BookSchema),
  UploadBookController
);

BookRouter.get(
  "/filter-book",
  Authorization(["user", "admin"]),
  FilterBookController
);

BookRouter.get(
  "/get-book-by-id/:id",
  Authorization(["user", "admin"]),
  GetBookByIdController
);

BookRouter.delete(
  "/delete-book/:id",
  Authorization(["user", "admin"]),
  DeleteBookController
);

BookRouter.get(
  "/get-approved-books",
  Authorization(["user", "admin"]),
  GetApprovedBooksController
);

BookRouter.put(
  "/update-book/:id",
  Authorization(["user", "admin"]),
  GenericValidator(UpdateBookSchema),
  UpdateBookController
);

BookRouter.put(
  "/approve-book/:id",
  Authorization(["admin"]),
  ApproveBookController
);

BookRouter.get(
  "/get-your-approved-books",
  Authorization(["user", "admin"]),
  GetYourApprovedBooksController
)

BookRouter.get(
  "/get-your-unApproved-books",
  Authorization(["user", "admin"]),
  GetYourUnApprovedBooksController
)


