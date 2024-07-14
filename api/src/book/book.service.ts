import { Express } from "express";
import { BookDTO } from "./contrat/dtos/Upload_book.dto";
import { db } from "../utils/db.server";
import { BookFilters } from "./book.controller";
import { UpdateBookDto } from "./contrat/dtos/Update_book.dto";
import { connect } from "http2";
export async function AddBook(bookDTO: BookDTO) {
  const { tags, year, department, course, createdById,...bookData } = bookDTO;
  
  let normalizedTags = Array.isArray(tags) ? tags : [tags];

  const tagPromises = normalizedTags.map(async (tagName) => {
    return __db?.tag.findFirst({
      where: { name: tagName ? tagName : "UnTagged" },
    });
  });
  const tagRecords = await Promise.all(tagPromises);

  const yearRecord = await __db?.year.findFirst({
    where: { year: year },
  });

  const departmentRecord = await __db?.department.findFirst({
    where: { departmentName: department },
  });

  const courseRecord = await __db?.course.findFirst({
    where: { courseName: course },
  });

  const createData: any = {
    ...bookData,
    createdBy: {
      connect: { id: bookDTO.createdById }
    },
    tags: {
      create: tagRecords.map((tag) => ({
        tag: {
          connect: { id: tag?.id },
        },
      })),
    },
  };

  if (yearRecord) {
    createData.year = {
      connect: { id: yearRecord.id },
    };
  }

  if (departmentRecord) {
    createData.department = {
      connect: { id: departmentRecord.id },
    };
  }

  if (courseRecord) {
    createData.course = {
      connect: { id: courseRecord.id },
    };
  }

  const book = await __db?.book.create({
    data: createData,
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
  const { tags, year, department, course } = filter;
  try {
    const books = await __db?.book.findMany({
      where: {
       
        year: year? {year : year} : undefined,
        department: department? {departmentName: department} :undefined,
        course: course? {courseName: course} : undefined,
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
      include: {
        year: {
          select: {
            year: true
          }
        },
        department: {
          select: {
            departmentName: true
          }
        },
        course: {
          select: {
            courseName: true
          }
        },
        tags: {
          select: {
            tag: {
              select: {
                name: true,
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
  return await __db?.book
    .findMany({
      where: {
        isApproved: true,
      },
      include: {
        tags: {
          select: {
            tag: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })
    .then((books) =>
      books.map((book) => ({
        ...book,
        tags: book.tags.map((tagJoin) => tagJoin.tag.name),
      }))
    );
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

  const bookWithTags = await __db?.book.findUnique({
    where: {
      id: bookId,
    },
    include: {
      year: {
        select: {
          year: true
        }
      },
      department: {
        select :{
          departmentName: true
        }
      },
      course: {
        select :{
          courseName: true
        }
      },
      tags: {
        select: {
          tag: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!bookWithTags) throw new Error("Book not found");

  const transformedTags = bookWithTags.tags.map((t) => t.tag.name);

  const result = {
    ...bookWithTags,
    tags: transformedTags,
  };

  return result;
}

export async function GetUsersUnApprovedBook(userId: string) {
  return await __db?.book
    .findMany({
      where: {
        createdById: userId,
        isApproved: false,
      },
      include: {
        tags: {
          select: {
            tag: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })
    .then((books) =>
      books.map((book) => ({
        ...book,
        tags: book.tags.map((tagJoin) => tagJoin.tag.name),
      }))
    );
}

export async function GetUsersApprovedBook(userId: string) {
  const approvedBooks = await __db?.book
    .findMany({
      where: {
        createdById: userId,
        isApproved: true,
      },
      include: {
        tags: {
          select: {
            tag: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })
    .then((books) =>
      books.map((book) => ({
        ...book,
        tags: book.tags.map((tagJoin) => tagJoin.tag.name),
      }))
    );

  return approvedBooks;
}
