import { StorySchema, StorySummarySchema } from "common-schema";
import { z } from "zod";

export type Story = z.infer<typeof StorySchema>;

export type StorySummary = z.infer<typeof StorySummarySchema>;
