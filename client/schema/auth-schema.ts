import { z } from "zod";

export const signinSchemma = z.object({
  email: z.string().email({
    message: "please enter a valid email!",
  }),
  password: z
    .string()
    .min(8, {
      message: "enter valid password!",
    })
    .max(16, {
      message: "max 16 characters!",
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: "password must contain at least one uppercase letter!",
    })
    .refine((value) => /\d/.test(value), {
      message: "password must contain at least one number!",
    })
    .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
      message: "password must contain at least one special character!",
    }),
});

export const signupSchemma = z.object({
  firstname: z
    .string()
    .min(2, {
      message: "min of 2 characters",
    })
    .max(20, {
      message: "max of 20 characters",
    }),
  lastname: z
    .string()
    .min(1, {
      message: "min of 2 characters",
    })
    .max(20, {
      message: "max of 20 characters",
    }),
  email: z.string().email({
    message: "please enter a valid email!",
  }),
  password: z
    .string()
    .min(8, {
      message: "enter valid password!",
    })
    .max(16, {
      message: "max 16 characters!",
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: "password must contain at least one uppercase letter!",
    })
    .refine((value) => /\d/.test(value), {
      message: "password must contain at least one number!",
    })
    .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
      message: "password must contain at least one special character!",
    }),
});
