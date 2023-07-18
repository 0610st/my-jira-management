import { z } from "zod";

export const StorySummarySchema = z.object({
  sprintId: z.number().nullable(),
  sum: z.object({
    storyPoint: z.number().nullable(),
  }),
});
