import { z } from "zod";
import { JiraResponseSchema } from "../jira";
import { Prisma } from "database";

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
});

export const TasksJiraResponseSchema = JiraResponseSchema(TaskIssueSchema);

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
