import { z } from "zod";
import { JiraIssueResponseSchema } from "../jira";
import { Prisma, Task } from "database";

export const TaskIssueSchema = z.object({
  assignee: z
    .object({
      displayName: z.string(),
    })
    .nullable(),
  summary: z.string(),
  parent: z
    .object({
      key: z.string(),
    })
    .nullable(),
  sprint: z
    .object({
      id: z.number(),
    })
    .nullable(),
  timespent: z.number().nullable(),
  labels: z.array(z.string()),
  timetracking: z.object({
    originalEstimate: z.string().optional(),
    remainingEstimate: z.string().optional(),
    timeSpent: z.string().optional(),
    originalEstimateSeconds: z.number().optional(),
    remainingEstimateSeconds: z.number().optional(),
    timeSpentSeconds: z.number().optional(),
  }),
  status: z.object({
    name: z.string(),
  }),
});

export const TasksJiraResponseSchema = JiraIssueResponseSchema(TaskIssueSchema);

export const CreateTaskSchema = z.object({
  key: z.string(),
  sprintId: z.number().nullable(),
  summary: z.string(),
  assignee: z.string().nullable(),
  estimatedTime: z.number().nullable(),
  spentTime: z.number().nullable(),
}) satisfies z.ZodType<Prisma.TaskCreateInput>;

export const CreateTasksFromJiraSchema = z.object({
  sprintIds: z.array(z.number()),
});

export const TaskSchema = z.object({
  key: z.string(),
  sprintId: z.number().nullable(),
  summary: z.string(),
  assignee: z.string().nullable(),
  estimatedTime: z.number().nullable(),
  spentTime: z.number().nullable(),
}) satisfies z.ZodType<Task>;

export const TasksQuerySchema = z.object({
  sprintId: z.number().optional(),
});
