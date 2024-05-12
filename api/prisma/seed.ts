import {db} from "../utils/db.server";

type User = {
    email: string;
    name: string;
    password: string;
    phonenumber: string;
}
type Book = {
    title:       string;
    author:      string;
    description: string;
    image:       string;
    createdById: string;
    year: number,
    course:string,
    department: string
    
} 

function getUsers() : Array<User> {
    const users: User[] = [
        {
            email: "geleta.dabakumsa@gmail.com",
            name: "Geleta Daba",
            password: "password",
            phonenumber: "0912345678"
        }
    ];
    return users;
}

function getBooks() : Array<Book> {
    const books: Book[] = [
        {
            title:       "Alchemist",
            author:      "Paulo coehlo",
            description: "Paulo coehlo wrote this amazing book about a shepherd",
            image:       "Paulo coehlo",
            createdById: "dummy-user-id",
            year: 2024,
            course: "Mathematics for AI",
            department: "myown"
        }
    ];
    return books;
}

async function seed() {
   
    await Promise.all(
        getUsers().map((user) => {
            const { email, name, password, phonenumber} = user;
            return  db.user.create({
                data:{
                    email : email,
                    name : name,
                    password: password,
                    phonenumber: phonenumber
                }
            })
        })
    );
    const seededUser = await db.user.findFirst({
        where: {
            email: "geleta.dabakumsa@gmail.com"
        }
    });
    
   if (seededUser){
    await Promise.all(
        getBooks().map((book)=> {
            const { title, author, description, image} = book;
            return db.book.create({
                data: {
                   title: title,
                   author: author,
                   description: description,
                   image: image ,
                   createdById: seededUser.id,
                   year: 2024,
                   course: "Mathematics for AI",
                   department: "myown"
                }
            })
        })
    )
}
}

seed();