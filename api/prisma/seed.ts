import { db } from "../src/utils/db.server";
import bcrypt from "bcrypt";

type User = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  userName: string;
  phonenumber: string;
  roles: string[];
};

type Book = {
  title: string;
  author: string;
  description: string;
  image: string;
  createdById: string;
  year: number;
  course: string;
  department: string;
};

function getUsers(): Array<User> {
  return [
    {
      email: "geleta.dabakumsa@gmail.com",
      firstName: "Geleta",
      lastName: "Kumsa",
      password: "password",
      userName: "gelo116",
      phonenumber: "0912345678",
      roles: ["admin"],
    },
  ];
}

function getTags(): Array<string> {
  return ["UnTagged", "Other", "DataBase", "OOP", "DSA", "Machine Learning", "Maths"];
}

function getBooks(): Array<Book> {
  return [
    {
      title: "Alchemist",
      author: "Paulo Coehlo",
      description: "Paulo Coehlo wrote this amazing book about a shepherd",
      image: "path/to/image.jpg",
      createdById: "dummy-user-id",
      year: 2024,
      course: "Mathematics for AI",
      department: "myown",
    },
  ];
}

function getRoles(): Array<string> {
  return ["admin", "user"];
}

async function seed() {
  // Create roles
  await Promise.all(
    getRoles().map((role) => {
      return db.role.create({
        data: {
          name: role,
        },
      });
    })
  );

  // Create users and assign roles
  await Promise.all(
    getUsers().map(async (user) => {
      const { email, firstName, lastName, userName, password, phonenumber, roles } = user;
      let hashedpassword = bcrypt.hashSync(password, 12);
      const createdUser = await db.user.create({
        data: {
          email,
          firstName,
          lastName,
          userName,
          password: hashedpassword,
          phonenumber,
        },
      });

      // Assign roles to the user
      await Promise.all(
        roles.map(async (roleName) => {
          const role = await db.role.findUnique({
            where: { name: roleName },
          });

          if (role) {
            await db.userRole.create({
              data: {
                userId: createdUser.id,
                roleId: role.id,
              },
            });
          }
        })
      );
    })
  );

  // Create tags
  const createdTags = await Promise.all(
    getTags().map((tag) => {
      return db.tag.create({
        data: {
          name: tag,
        },
      });
    })
  );

  // Create books
  const seededUser = await db.user.findFirst({
    where: {
      email: "geleta.dabakumsa@gmail.com",
    },
  });

  if (seededUser) {
    await Promise.all(
      getBooks().map(async (book) => {
        const { title, author, description, image, year, course, department } = book;
        const createdBook = await db.book.create({
          data: {
            title,
            author,
            description,
            image,
            createdById: seededUser.id,
            year,
            course,
            department,
          },
        });

        const otherTag = createdTags.find((tag) => tag.name === "Other");
        if (otherTag) {
          
          await db.tagsOnBooks.create({
            data: {
              bookId: createdBook.id,
              tagId: otherTag.id,
            },
          });
        }
      })
    );
  }
}

seed()
  .catch((e) => console.error(e))
  .finally(async () => {
    await db.$disconnect();
  });
