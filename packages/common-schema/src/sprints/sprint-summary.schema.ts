import { z } from "zod";
import { StorySummarySchema } from "../stories";
import { TaskSummarySchema } from "../tasks";

export const SprintSummarySchema = z.object({
  taskSummaries: z.array(TaskSummarySchema),
  storySummaries: z.array(StorySummarySchema),
});
