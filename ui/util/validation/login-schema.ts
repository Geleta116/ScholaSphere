import z from "zod";

export const LoginSchema = z.object({
  userName: z
    .string()
    .min(3, { message: "user name must be atleast 3 characters" })
    .max(20, { message: "user name must not be longer thatn 20 characters" }),
  password: z
    .string()
    .min(8, { message: "password must be atleast 8 characters" }),
});
