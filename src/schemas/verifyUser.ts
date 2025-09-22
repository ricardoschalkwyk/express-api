import * as z from "zod";

export const verifyUserSchema = z.object({
  email: z.email(),
  password: z.string().min(5, "Too short!, be better!"),
});
