import { Express} from "express";
import { BookDTO } from "./contrat/dtos/Upload_book.dto";
import { db } from "../utils/db.server";

export async function AddBook(bookDTO: BookDTO){
    await db.book.create({
        data : {...bookDTO}
    })
}