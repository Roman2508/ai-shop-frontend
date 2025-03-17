import { z } from "zod";

export const formSchema = z.object({
  displayName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),

  city: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  street: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  postOffice: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});
