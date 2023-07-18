import { AppEnvironmentSchema } from "contracts";
import { z } from "zod";

export type AppEnvironment = z.infer<typeof AppEnvironmentSchema>;
