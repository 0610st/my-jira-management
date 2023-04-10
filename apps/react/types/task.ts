import { z } from "zod";
import { TaskSchema, TaskSummarySchema } from "common-schema";

export type Task = z.infer<typeof TaskSchema>;

export type TaskSummary = z.infer<typeof TaskSummarySchema>;
