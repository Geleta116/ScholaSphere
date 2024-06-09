import {z} from "zod";

export const CreateUserSchema = z.object({
   email: z.string().email(),
   name: z.string().min(1, "name can't be empty"),
   password: z.string().min(8, "password length must be greater or equals to 8"),
  
});