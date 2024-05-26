import { z } from "zod";

// Post Form Validation
export const codeBlockSchema = z.object({
  content: z.string().min(1, {
    message: "Add Code",
  }),
  language: z.string().min(1, {
    message: "Add language",
  }),
  title: z.string().min(1, {
    message: "Add title",
  }),
  description: z.string().min(1, {
    message: "Add description",
  }),
});

export type codeBlockValues = z.infer<typeof codeBlockSchema>;

export const postSchema = z.object({
  title: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
  slug: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  tech: z.array(z.string()).min(1, {
    message: "Tech field must have at least one value.",
  }),
  codeblock: z.array(codeBlockSchema),
  image: z.string().optional(),
  id: z.string().optional(),
  showimg: z.boolean().optional(),
});

export type postValues = z.infer<typeof postSchema>;

// User Form
// Sign in Form
export const signInShema = z.object({
  email: z.string().email({ message: "Invalid email adress" }),
  password: z
    .string()
    .min(10, { message: "Password must be at least 10 characters." }),
});

export type signInValues = z.infer<typeof signInShema>;

// Sign up Form
export const signUpShema = z.object({
  fullname: z.string().min(1, { message: "Please enter your name" }),
  email: z.string().email({ message: "Invalid email adress" }),
  password: z
    .string()
    .min(10, { message: "Password must be at least 10 characters." }),
});

export type signUpValues = z.infer<typeof signUpShema>;

// password
export const ResetShema = z.object({
  email: z.string().email({ message: "Invalid email adress" }),
});

export type ResetValues = z.infer<typeof ResetShema>;

// otp
export const OTPSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
  email: z.string().email({ message: "Invalid email adress" }),
});

export type OTPValues = z.infer<typeof OTPSchema>;

// Reset password
export const ResetPassShema = z
  .object({
    password: z
      .string()
      .min(10, { message: "Password must be at least 10 characters." }),
    confirmPassword: z
      .string()
      .min(10, { message: "Password must be at least 10 characters." }),
    email: z.string().email({ message: "Invalid email adress" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ResetPassShemaValues = z.infer<typeof ResetPassShema>;
