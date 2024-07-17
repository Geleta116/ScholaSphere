import { z } from "zod";


const bookSchema = z.object({
    file: z
      .instanceof(File)
      .refine((file) => file.type === "application/pdf", {
        message: "Book must be a PDF",
      }),
    title: z.string().min(3, { message: "Title must be at least 3 characters" }),
    description: z
      .string()
      .max(400, { message: "Description must not be more than 400 characters" }),
    year: z.number({ invalid_type_error: "Year must be selected" }).int(),
    department: z.string().nonempty({ message: "Department must be selected" }),
    course: z.string().nonempty({ message: "Course must be selected" }),
    tags: z.array(z.string()),
  });


export default bookSchema;