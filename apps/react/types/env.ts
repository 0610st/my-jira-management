import { AppEnvironmentSchema } from "common-schema";
import { z } from "zod";

export type AppEnvironment = z.infer<typeof AppEnvironmentSchema>;
