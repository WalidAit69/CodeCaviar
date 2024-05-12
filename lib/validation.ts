import { z } from "zod";

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
