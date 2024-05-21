import { Express } from "express";
import { BookDTO } from "./contrat/dtos/Upload_book.dto";
import { db } from "../utils/db.server";
import { BookFilters } from "./book.route";
import { UpdateBookDto } from "./contrat/dtos/Update_book.dto";

export async function AddBook(bookDTO: BookDTO) {
  await db.book.create({
    data: { ...bookDTO },
  });
}

export async function GetBookById(id: string) {
  try {
    const book = await __db?.book.findFirst({
      where: {
        id,
      },
    });
    return book;
  } catch (e) {
    throw e;
  }
}

export async function GetFilteredBooks(filter: BookFilters) {
  try {
    const books = await __db?.book.findMany({
      where: filter,
    });
    return books;
  } catch (e) {
    throw e;
  }
}

export async function DeleteBookById(id: string) {
  try {
    return await __db?.book.delete({
      where: { id: id },
    });
  } catch (e) {
    throw e;
  }
}

export async function GetApprovedBooks() {
  return await __db?.book.findMany({
    where: {
      isApproved: true,
    },
  });
}

export async function UpdateBookById(id: string, data: any): Promise<void> {
  try {
    await __db?.book.update({
      where: { id: id },
      data: { ...data },
    });
  } catch (error) {
    throw new Error(`Failed to update book with ID ${id}: ${error}`);
  }
}

export async function UpdateBook(
  id: string,
  userData: { id: string; role: string },
  requestBody: UpdateBookDto
) {
  const book = await __db?.book.findFirst({
    where: {
      id,
    },
  });

  if (!book) {
    throw new Error("Book not found.");
  }

  if (book.createdById !== userData.id && userData.role !== "admin")
    throw new Error("you don't have permission to delete the book");

  if (book.isApproved && userData.role !== "admin")
    throw new Error("you can't edit this book as it has been approved");

  if (!book.isApproved) {
    const allowedFields = [
      "title",
      "author",
      "description",
      "year",
      "course",
      "department",
    ];
    const updateData = Object.keys(requestBody).reduce((obj, key) => {
      if (allowedFields.includes(key)) {
        (obj as any)[key] = (requestBody as any)[key];
      }
      return obj;
    }, {});

    await UpdateBookById(id, updateData);
  } else {
    await UpdateBookById(id, requestBody);
  }
}
