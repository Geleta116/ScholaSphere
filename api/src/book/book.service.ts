import { Express } from "express";
import { BookDTO } from "./contrat/dtos/Upload_book.dto";
import { db } from "../utils/db.server";
import { BookFilters } from "./book.controller";
import { UpdateBookDto } from "./contrat/dtos/Update_book.dto";

export async function AddBook(bookDTO: BookDTO) {
  const { tags, ...bookData } = bookDTO;

  let normalizedTags = Array.isArray(tags) ? tags : [tags];

  const tagPromises = await normalizedTags.map(async (tagName?) => {
    return __db?.tag.findFirst({
      where: { name: tagName ? tagName : "UnTagged" },
    });
  });
  const tagRecords = await Promise.all(tagPromises);

  const book = await __db?.book.create({
    data: {
      ...bookData,
      tags: {
        create: tagRecords.map((tag) => ({
          tag: {
            connect: { id: tag?.id },
          },
        })),
      },
    },
  });

  return book;
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
  const { tags, ...filterData } = filter;
  try {
    const books = await __db?.book.findMany({
      where: {
        ...filterData,
        tags: {
          some: {
            tag: {
              name: {
                in: tags,
              },
            },
          },
        },
      },
    });
    return books;
  } catch (e) {
    throw e;
  }
}

export async function DeleteBookById(
  bookid: string,
  currUserId: string,
  roles: string[]
) {
  try {
    const book = await __db?.book.findFirst({
      where: {
        id: bookid,
      },
    });

    if (!book) throw new Error("Book not found");
    if (book.isApproved && !roles.includes("admin")) {
      throw new Error(" You can't delete a book that is Approved");
    }
    if (
      (!book.isApproved && roles.includes("admin")) ||
      (!book.isApproved && book.createdById === currUserId)
    ) {
      return await __db?.book.delete({
        where: { id: bookid },
      });
    }
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
    return;
  } catch (error) {
    throw new Error(`Failed to update book with ID ${id}: ${error}`);
  }
}

export async function UpdateBook(
  id: string,
  userData: { id: string; role: string[] },
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

  if (book.createdById !== userData.id && !userData.role.includes("admin"))
    throw new Error("you don't have permission to delete the book");

  if (book.isApproved && !userData.role.includes("admin"))
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

export async function ApproveBook(bookId: string) {
  
  const book = await __db?.book.findFirst({
    where: {
      id: bookId,
    },
  });

  if (!book) throw new Error("Book not found");
  
  await __db?.book.update({
    where: {
      id: bookId,
    },
    data: {
      isApproved: true,
    },
  });
  return book ;
}

export async function GetUsersUnApprovedBook(userId: string) {
  const unApprovedBooks = await __db?.book.findMany({
    where: {
      createdById: userId,
      isApproved: false,
    },
  });
  return unApprovedBooks;
}

export async function GetUsersApprovedBook(userId: string) {
  const approvedBooks = await __db?.book.findMany({
    where: {
      createdById: userId,
      isApproved: true,
    },
  });

  return approvedBooks;
}
