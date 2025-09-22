import bcrypt from "bcrypt";
import * as z from "zod";

const saltRounds = 5; // Adjust for desired computational cost

export async function hashPassword(plainPassword: string): Promise<string> {
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

  return hashedPassword;
}

export async function verifyPassword(
  plainPassword: string,
  hashedPassword: string
) {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);

  return isMatch;
}

export function formatZodError(error: z.ZodError) {
  const formatted: Record<string, string> = {};

  for (const issue of error.issues) {
    const path = issue.path.join(".");
    // Only store the first error per field
    if (!formatted[path]) {
      formatted[path] = issue.message;
    }
  }

  return formatted;
}

export const validate = (schema: z.ZodSchema) => (req, res, next) => {
  try {
    schema.parse(req.body); // Or req.query, req.params

    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ status: 400, errors: formatZodError(error) });
    }

    next(error); // Pass other errors to the next error handler
  }
};
