import { z, } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Email is invalid."),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .regex(/^\S+$/, "Password must not contain spaces.")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
      message:
        "Password must include an uppercase letter, a lowercase letter, a number and a special character.",
    }),
});
