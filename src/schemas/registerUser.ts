import * as z from "zod";

export const UserRegisterSchema = z.object({
  username: z.string().min(3),
  email: z.email(),
  password: z.string().min(5, "Too short!, be better!"),
});
