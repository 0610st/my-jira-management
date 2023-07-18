import { z } from "zod";
import { UserSchema } from "contracts";

export type User = z.infer<typeof UserSchema>;
