import express, { NextFunction, Response } from "express";
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
} from "./book.service";
import { UpdateBookDto } from "./contrat/dtos/Update_book.dto";
import { Req } from "@/utils/req";

export interface BookFilters {
  year?: number;
  department?: string;
  course?: string;
}

export const UploadBookController = async (
  req: Req,
  res: Response,
  next: NextFunction
) => {
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
};

export const FilterBookController = async (
  req: Req,
  res: Response,
  next: NextFunction
) => {
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
};

export const GetBookByIdController = async (
  req: Req,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id as string;
    const book = await GetBookById(id);
    return res.status(200).json(book);
  } catch (e) {
    return res.status(500).send("Internal server error");
  }
};

export const DeleteBookController = async (
  req: Req,
  res: Response,
  next: NextFunction
) => {
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
};

export const GetApprovedBooksController = async (
  req: Req,
  res: Response,
  next: NextFunction
) => {
  try {
    const books = await GetApprovedBooks();
    return res.status(200).json(books);
  } catch (e) {
    return res.status(500).send("Internal server error");
  }
};

export const UpdateBookController = async (
  req: Req,
  res: Response,
  next: NextFunction
) => {
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
};

export const ApproveBookController = async (
  req: Req,
  res: Response,
  next: NextFunction
) => {
  try {
    const BookId = req?.params.id;
    if (!BookId) return res.status(400).send("Please add BookId");
    await ApproveBook(BookId);
  } catch (e) {
    return res.status(500).send("internal server error");
  }
};
