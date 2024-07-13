import { z } from "zod";

export const BookSchema = z.object({
  author: z.string().min(3, "Author required or too short"),
  description: z.string().min(8, "Description can't be less than 10"),
  year: z.preprocess((val) => {
    if (typeof val === "string") {
      return parseInt(val, 10);
    }
    return val;
  }, z.number().min(1, { message: "year can't be less than 1" }).max(5, { message: "year can't be greater than 5" })),
  course: z.string().min(1, "course is required"),
  department: z.string().min(1, "department is required"),
  title: z.string().min(3, "Title required or too short"),
});
