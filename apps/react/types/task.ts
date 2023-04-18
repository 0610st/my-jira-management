import { z } from "zod";
import {
  TaskIssueSchema,
  TaskSchema,
  TasksJiraResponseSchema,
  TaskSummarySchema,
} from "common-schema";

export type Task = z.infer<typeof TaskSchema>;

export type TaskSummary = z.infer<typeof TaskSummarySchema>;

export type TasksJiraResponse = z.infer<typeof TasksJiraResponseSchema>;

export type TaskIssue = z.infer<typeof TaskIssueSchema>;
