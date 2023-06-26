import { EpicIssueSchema, EpicsJiraResponseSchema } from "common-schema";
import { z } from "zod";

export type EpicsJiraResponse = z.infer<typeof EpicsJiraResponseSchema>;

export type EpicIssue = z.infer<typeof EpicIssueSchema>;
