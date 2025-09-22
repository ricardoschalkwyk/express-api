import * as z from "zod";

export const UpdateUserSchema = z.object({
  username: z.string().min(3),
  email: z.email(),
});
