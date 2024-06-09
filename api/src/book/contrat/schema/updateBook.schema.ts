import {z} from "zod";

export const UpdateBookSchema = z.object({
   title: z.string(),
   author: z.string(),
   description: z.string(),
   year: z.number(),
   course: z.string(),
   department: z.string()

})
