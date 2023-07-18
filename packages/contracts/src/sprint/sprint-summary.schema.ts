import { z } from "zod";
import { StorySummarySchema } from "../story";
import { TaskSummarySchema } from "../task";

export const SprintSummarySchema = z.object({
  taskSummaries: z.array(TaskSummarySchema),
  storySummaries: z.array(StorySummarySchema),
});
