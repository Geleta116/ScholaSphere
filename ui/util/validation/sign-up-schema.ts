import z from "zod";

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

const phoneValidation = new RegExp(
  /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/
);

export const SignUpSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "first name must be atleast 3 characters" })
    .max(20, { message: "first name must not be longer thatn 20 characters" }),
  lastName: z
    .string()
    .min(3, { message: "last name must be atleast 3 characters" })
    .max(20, { message: "last name must not be longer thatn 20 characters" }),
  userName: z
    .string()
    .min(3, { message: "user name must be atleast 3 characters" })
    .max(20, { message: "user name must not be longer thatn 20 characters" }),
  email: z
    .string()
    .email({ message: "Invalid Email" })
    .min(1, { message: "email is required" }),
  password: z
    .string()
    .min(8, { message: "password must be atleast 8 characters" })
    .regex(passwordValidation, { message: "Password is not strong enough" }),
  phoneNumber: z
    .string()
    .regex(phoneValidation, { message: "invalid phone" }).optional(),
});

