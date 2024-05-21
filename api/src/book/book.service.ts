import { Express } from "express";
import { BookDTO } from "./contrat/dtos/Upload_book.dto";
import { db } from "../utils/db.server";
import { BookFilters } from "./book.route";

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

export async function DeleteBookById(id: string){
    try {
        return await __db?.book.delete({
            where :{ id: id}
        }) 
    } catch(e){
        throw e;
    }
}

export async function GetApprovedBooks(){
    return await __db?.book.findMany({
        where :{
            isApproved: true
        }
    })
}
