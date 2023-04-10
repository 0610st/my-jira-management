import { z } from "zod";

export const TaskSummarySchema = z.object({
  assignee: z.string().nullable(),
  sprintId: z.number().nullable(),
  sum: z.object({
    spentTime: z.number().nullable(),
    estimatedTime: z.number().nullable(),
  }),
  count: z.number(),
});
