import { z } from "zod";

// Post Form Validation

export const codeBlockSchema = z.object({
  content: z.string().min(1, {
    message: "Tech field must have at least one value.",
  }),
  language: z.string().min(1, {
    message: "Tech field must have at least one value.",
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
