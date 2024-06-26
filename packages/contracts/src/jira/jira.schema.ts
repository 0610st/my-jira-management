import { z } from "zod";
import { SprintStateSchema } from "../sprint/sprint.schema";

export const JiraIssueResponseSchema = <IssueFieldType extends z.ZodTypeAny>(
  issueSchema: IssueFieldType,
) =>
  z.object({
    expand: z.string(),
    startAt: z.number(),
    maxResults: z.number(),
    total: z.number(),
    issues: z.array(
      z.object({ id: z.string(), key: z.string(), fields: issueSchema }),
    ),
  });

export const GetJiraSprintsSchema = z.object({
  startAt: z.union([z.string(), z.number()]).optional(),
  state: SprintStateSchema.optional(),
});

export const GetJiraEpicsSchema = z.object({
  sprintId: z.number(),
});

export const ImportJiraSprintResultSchema = z.object({
  sprintId: z.number(),
  withTasks: z.boolean(),
  withStories: z.boolean(),
});

export const JiraSearchConditionSchema = z.object({
  key: z.string(),
  value: z.string(),
  operator: z.string().optional(),
});

export const JiraSearchSchema = z.object({
  conditions: z.array(JiraSearchConditionSchema),
  startAt: z.union([z.string(), z.number()]).optional(),
});

export const JiraTaskUpdateSchema = z.object({
  sprintId: z.number(),
  labels: z.array(z.string()),
});

export const JiraTaskCreateSchema = z.object({
  name: z.string(),
  parentKey: z.string(),
  sprintId: z.number(),
  estimatedTime: z.number().optional(),
  labels: z.array(z.string()),
});

export const JiraEpicUpdateSchema = z.object({
  labels: z.array(z.string()),
});
