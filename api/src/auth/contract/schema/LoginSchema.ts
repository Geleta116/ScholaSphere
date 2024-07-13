import {z} from "zod";

export const LoginSchema = z.object({
   userName: z.string().min(3, "user name must be atleast 3 characters"),
   password: z.string().min(8, "password length must be greater or equals to 8"),
  
});