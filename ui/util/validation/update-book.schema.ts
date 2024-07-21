import { z } from "zod";


const updateBookSchema = z.object({
    
    title: z.string().min(3, { message: "Title must be at least 3 characters" }),
    author: z.string().min(3, { message: "Author must be at least 3 characters" }),
   
    description: z
      .string()
      .min(10, { message: "Description must be at least 10 characters" })
      .max(400, { message: "Description must not be more than 400 characters" }),
    year: z.number({ invalid_type_error: "Year must be selected" }).int(),
    department: z.string().nonempty({ message: "Department must be selected" }),
    course: z.string().nonempty({ message: "Course must be selected" }),
    
  });


export default updateBookSchema;