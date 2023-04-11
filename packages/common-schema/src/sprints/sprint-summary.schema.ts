import { z } from "zod";
import { TaskSummarySchema } from "../tasks";

export const SprintSummarySchema = z.object({
  taskSummaries: z.array(TaskSummarySchema),
});
