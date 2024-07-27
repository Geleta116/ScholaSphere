import { Express } from "express";
import { BookDTO } from "./contrat/dtos/Upload_book.dto";
import { db } from "../utils/db.server";
import { BookFilters } from "./book.controller";
import { UpdateBookDto } from "./contrat/dtos/Update_book.dto";
import { connect } from "http2";
import { any } from "zod";

const bookInclude = {
  year: {
    select: {
      year: true,
    },
  },
  department: {
    select: {
      departmentName: true,
    },
  },
  course: {
    select: {
      courseName: true,
    },
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
};

interface Year {
  year: number;
}

interface Department {
  departmentName: string;
}

interface Course {
  courseName: string;
}

interface Tag {
  name: string;
}

interface Book {
  year: Year;
  department: Department;
  course: Course;
  tags: { tag: Tag }[];
  [key: string]: any;
}

const formatBooks = (books: Book[]): any[] => {
  return books?.map((book) => ({
    ...book,
    year: book.year.year,
    department: book.department.departmentName,
    course: book.course.courseName,
    tags: book.tags.map((tagJoin) => tagJoin.tag.name),
  }));
};

export async function AddBook(bookDTO: BookDTO) {
  const { tags, year, department, course, createdById, ...bookData } = bookDTO;

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
      connect: { id: bookDTO.createdById },
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
        year: year ? { year: year } : undefined,
        department: department ? { departmentName: department } : undefined,
        course: course ? { courseName: course } : undefined,
        isApproved: true,
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
      include: bookInclude,
    });
    if (!books) return [];
    return formatBooks(books);
  } catch (e) {
    throw e;
  }
}

export async function GetFilteredUnApprovedBooks(filter: BookFilters) {
  const { tags, year, department, course } = filter;
  try {
    const books = await __db?.book.findMany({
      where: {
        year: year ? { year: year } : undefined,
        department: department ? { departmentName: department } : undefined,
        course: course ? { courseName: course } : undefined,
        isApproved: false,
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
      include: bookInclude,
    });
    if (!books) return [];
    return formatBooks(books);
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
      (!book.isApproved && book.createdById === currUserId) ||
      roles.includes("admin")
    ) {
      console.log("working");
      return await __db?.book.delete({
        where: { id: bookid },
      });
    }
  } catch (e) {
    throw e;
  }
}

export async function GetApprovedBooks() {
  try {
    const books = await __db?.book.findMany({
      where: {
        isApproved: true,
      },
      include: bookInclude,
    });
    if (!books) return [];
    return formatBooks(books);
  } catch (e) {
    throw e;
  }
}

export async function GetUnApprovedBooks() {
  try {
    const books = await __db?.book.findMany({
      where: {
        isApproved: false,
      },
      include: bookInclude,
    });
    if (!books) return [];
    return formatBooks(books);
  } catch (e) {
    throw e;
  }
}

export async function UpdateBookById(
  id: string,
  data: UpdateBookDto
): Promise<void> {
  try {
    const updateData: any = {};

    if (data.year) {
      const year = await __db?.year.findUnique({ where: { year: data.year } });
      if (year) {
        updateData.yearId = year.id;
      } else {
        throw new Error(`Year not found`);
      }
    }

    if (data.course) {
      const course = await __db?.course.findUnique({
        where: { courseName: data.course },
      });
      if (course) {
        updateData.courseId = course.id;
      } else {
        throw new Error(`Course not found`);
      }
    }

    // Handle updating department
    if (data.department) {
      const department = await __db?.department.findUnique({
        where: { departmentName: data.department },
      });
      if (department) {
        updateData.departmentId = department.id;
      } else {
        throw new Error(`Department not found`);
      }
    }

    // Handle updating tags

    if (data.tags && data.tags.length > 0) {
      console.log(data.tags.length);
      const tags = await __db?.tag.findMany({
        where: { name: { in: data.tags } },
      });

      // First, delete existing tags
      await __db?.tagsOnBooks.deleteMany({ where: { bookId: id } });
      // Then, create new tag associations
      if (tags) {
        for (const tag of tags) {
          await __db?.tagsOnBooks.create({
            data: {
              bookId: id,
              tagId: tag.id,
            },
          });
        }
      }
    } else {
      console.log("hereeeeeeeeeee");
      await __db?.tagsOnBooks.deleteMany({
        where: {
          bookId: id,
        },
      });
      const unTaggedId = await __db?.tag.findFirst({
        where: {
          name: "UnTagged",
        },
      });
      if (!unTaggedId) throw Error("Untagged Tag doesn't exist");
      await __db?.tagsOnBooks.create({
        data: {
          bookId: id,
          tagId: unTaggedId?.id,
        },
      });
    }

    // Update book with remaining data
    const allowedFields: Array<keyof typeof updateData> = [
      "title",
      "author",
      "description",
      "isApproved",
    ];
    for (const field of allowedFields) {
      if (data[field as keyof UpdateBookDto] !== undefined) {
        updateData[field] = data[field as keyof UpdateBookDto];
      }
    }

    await __db?.book.update({
      where: { id: id },
      data: updateData,
    });
  } catch (error) {
    throw Error(`${error}`);
  }
}

export async function UpdateBook(
  id: string,
  userData: { id: string; role: string[] },
  requestBody: UpdateBookDto
): Promise<void> {
  try {
    const book = await __db?.book.findUnique({
      where: { id },
    });

    if (!book) {
      throw new Error("Book not found.");
    }

    if (book.createdById !== userData.id && !userData.role.includes("admin")) {
      throw new Error("You don't have permission to update this book");
    }

    if (book.isApproved && !userData.role.includes("admin")) {
      throw new Error("You can't edit this book as it has been approved");
    }

    if (
      userData.role.includes("admin") ||
      (!book.isApproved && userData.id === book.createdById)
    ) {
      const allowedFields: Array<keyof UpdateBookDto> = [
        "title",
        "author",
        "description",
        "year",
        "course",
        "department",
        "tags",
      ];
      const updateData = Object.keys(requestBody).reduce((obj, key) => {
        if (allowedFields.includes(key as keyof UpdateBookDto)) {
          (obj as any)[key] = (requestBody as any)[key];
        }
        return obj;
      }, {} as UpdateBookDto);

      await UpdateBookById(id, updateData);
    } else {
      throw new Error(`Failed to update book`);
    }
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to update book with ID ${id}: ${error}`);
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
    include: bookInclude,
  });

  if (!bookWithTags) throw new Error("Book not found");

  return formatBooks([bookWithTags])[0];
}

export async function UnApproveBook(bookId: string) {
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
      isApproved: false,
    },
  });

  const bookWithTags = await __db?.book.findUnique({
    where: {
      id: bookId,
    },
    include: bookInclude,
  });

  if (!bookWithTags) throw new Error("Book not found");

  return formatBooks([bookWithTags])[0];
}

export async function GetUsersUnApprovedBook(userId: string) {
  try {
    const books = await __db?.book.findMany({
      where: {
        createdById: userId,
        isApproved: false,
      },
      include: bookInclude,
    });
    if (!books) return [];
    return formatBooks(books);
  } catch (e) {
    throw e;
  }
}

export async function GetUsersApprovedBook(userId: string) {
  try {
    const books = await __db?.book.findMany({
      where: {
        createdById: userId,
        isApproved: true,
      },
      include: bookInclude,
    });
    if (!books) return [];
    return formatBooks(books);
  } catch (e) {
    throw e;
  }
}
