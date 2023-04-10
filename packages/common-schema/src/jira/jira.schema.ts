import { z } from "zod";

export const JiraIssueResponseSchema = <IssueFieldType extends z.ZodTypeAny>(
  issueSchema: IssueFieldType
) =>
  z.object({
    expand: z.string(),
    startAt: z.number(),
    maxResults: z.number(),
    total: z.number(),
    issues: z.array(z.object({ key: z.string(), fields: issueSchema })),
  });
