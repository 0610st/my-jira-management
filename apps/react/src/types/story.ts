import { StorySchema, StorySummarySchema } from "contracts";
import { z } from "zod";

export type Story = z.infer<typeof StorySchema>;

export type StorySummary = z.infer<typeof StorySummarySchema>;
