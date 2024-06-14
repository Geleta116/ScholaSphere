import z from "zod";

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);



export const LoginSchema = z.object({
  
  userName: z
    .string()
    .min(3, { message: "user name must be atleast 3 characters" })
    .max(20, { message: "user name must not be longer thatn 20 characters" }),
  password: z
    .string()
    .min(8, { message: "password must be atleast 8 characters" })
    .regex(passwordValidation, { message: "Password is not strong enough" }),
  
});

