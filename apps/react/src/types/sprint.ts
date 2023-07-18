import { z } from "zod";
import {
  GetJiraSprintsSchema,
  SprintsJiraResponseSchema,
  SprintValueSchema,
  ImportJiraSprintResultSchema,
} from "contracts";

export type GetJiraSprints = z.infer<typeof GetJiraSprintsSchema>;

export type SprintsJiraResponse = z.infer<typeof SprintsJiraResponseSchema>;

export type SprintValue = z.infer<typeof SprintValueSchema>;

export type CreateSprintWithIssuesFromJira = z.infer<
  typeof ImportJiraSprintResultSchema
>;
