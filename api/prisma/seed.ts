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
  createdById: string;
  yearId: string;
  courseId: string;
  departmentId: string;
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

function getRoles(): Array<string> {
  return ["admin", "user"];
}

function getYears(): Array<number> {
  return [1, 2, 3, 4, 5];
}

function getDepartments(): Array<string> {
  return [
    "Software Engineering",
    "Mechanical Engineering",
    "Biomedical Engineering",
    "Chemical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
  ];
}

function getCourses(): Array<string> {
  return ["DSA", "OOP"];
}

async function seed() {
  
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

  // Create years
  const createdYears = await Promise.all(
    getYears().map((year) => {
      return db.year.create({
        data: {
          year,
        },
      });
    })
  );

  // Create departments
  const createdDepartments = await Promise.all(
    getDepartments().map((departmentName) => {
      return db.department.create({
        data: {
          departmentName,
        },
      });
    })
  );

  // Create courses
  const createdCourses = await Promise.all(
    getCourses().map((courseName) => {
      return db.course.create({
        data: {
          courseName,
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
    const course = createdCourses.find((c) => c.courseName === "DSA");
    const department = createdDepartments.find((d) => d.departmentName === "Software Engineering");
    const year = createdYears.find((y) => y.year === 3);

    if (course && department && year) {
      await db.book.create({
        data: {
          title: "Data Structures and Algorithms",
          author: "Mark Allen Weiss",
          description: "An in-depth exploration of data structures and algorithms.",
       
          createdById: seededUser.id,
          yearId: year.id,
          courseId: course.id,
          departmentId: department.id,
        },
      });

      const otherTag = createdTags.find((tag) => tag.name === "Other");
      if (otherTag) {
        const book = await db.book.findFirst({
          where: {
            title: "Data Structures and Algorithms",
          },
        });

        if (book) {
          await db.tagsOnBooks.create({
            data: {
              bookId: book.id,
              tagId: otherTag.id,
            },
          });
        }
      }
    }
  }
}

seed()
  .catch((e) => console.error(e))
  .finally(async () => {
    await db.$disconnect();
  });
