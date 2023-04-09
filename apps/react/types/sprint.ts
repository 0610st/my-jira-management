import { z } from "zod";
import { SprintSchema } from "common-schema";

export type Sprint = z.infer<typeof SprintSchema>;
