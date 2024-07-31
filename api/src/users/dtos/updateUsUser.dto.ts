import {z} from "zod";

export const UpdateUserSchema = z.object({
   email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    userName: z.string(),
   description: z.string(),
   phoneNumber: z.string(),
   profilepicture: z.string()
})
