import { z } from "zod";
import { SprintStateSchema } from "../sprints/sprints.schema";

export const JiraIssueResponseSchema = <IssueFieldType extends z.ZodTypeAny>(
  issueSchema: IssueFieldType
) =>
  z.object({
    expand: z.string(),
    startAt: z.number(),
    maxResults: z.number(),
    total: z.number(),
    issues: z.array(
      z.object({ id: z.string(), key: z.string(), fields: issueSchema })
    ),
  });

export const GetJiraSprintsSchema = z.object({
  startAt: z.string().optional(),
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

export const JiraSearchSchema = z.object({
  conditions: z.array(z.object({ key: z.string(), value: z.string() })),
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
