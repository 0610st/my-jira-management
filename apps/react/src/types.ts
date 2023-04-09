import { z } from "zod";
import { UserSchema } from "common-schema";

export type User = z.infer<typeof UserSchema>;
