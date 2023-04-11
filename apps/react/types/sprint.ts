import { z } from "zod";
import { SprintSchema, SprintSummarySchema } from "common-schema";

export type Sprint = z.infer<typeof SprintSchema>;

export type SprintSummary = z.infer<typeof SprintSummarySchema>;
