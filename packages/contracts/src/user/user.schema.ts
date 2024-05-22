import { User } from "database";
import { z } from "zod";

export const CreateUserInputSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
});

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string().email().nullable(),
  emailVerified: z.date().nullable(),
}) satisfies z.ZodType<User>;
