import { z } from "zod";
import { JiraIssueResponseSchema } from "../jira";

export const EpicIssueSchema = z.object({
  summary: z.string(),
  sprint: z
    .object({
      id: z.number(),
    })
    .nullable(),
  customfield_10016: z.number().nullable().describe("story point estimate"),
});

export const EpicsJiraResponseSchema = JiraIssueResponseSchema(EpicIssueSchema);
