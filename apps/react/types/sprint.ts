import { z } from "zod";
import {
  SprintSchema,
  SprintSummarySchema,
  GetJiraSprintsSchema,
  SprintsJiraResponseSchema,
  SprintValueSchema,
  ImportJiraSprintResultSchema,
} from "common-schema";

export type Sprint = z.infer<typeof SprintSchema>;

export type SprintSummary = z.infer<typeof SprintSummarySchema>;

export type GetJiraSprints = z.infer<typeof GetJiraSprintsSchema>;

export type SprintsJiraResponse = z.infer<typeof SprintsJiraResponseSchema>;

export type SprintValue = z.infer<typeof SprintValueSchema>;

export type CreateSprintWithIssuesFromJira = z.infer<
  typeof ImportJiraSprintResultSchema
>;
