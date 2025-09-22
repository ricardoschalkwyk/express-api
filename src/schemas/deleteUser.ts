import * as z from "zod";

export const DeleteUserSchema = z.object({
  deletedAt: z.date(),
  isDeleted: z.boolean(),
});
