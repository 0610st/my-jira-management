import { StorySummarySchema } from "common-schema";
import { z } from "zod";

export type StorySummary = z.infer<typeof StorySummarySchema>;
