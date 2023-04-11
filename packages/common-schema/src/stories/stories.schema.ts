import { Prisma, Story } from "database";
import { z } from "zod";
import { JiraIssueResponseSchema } from "../jira";

export const StoryIssueSchema = z.object({
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
  customfield_10016: z.number().nullable().describe("story point estimate"),
});

export const StoriesJiraResponseSchema =
  JiraIssueResponseSchema(StoryIssueSchema);

export const CreateStorySchema = z.object({
  key: z.string(),
  sprintId: z.number().nullable(),
  summary: z.string(),
  storyPoint: z.number().nullable(),
}) satisfies z.ZodType<Prisma.StoryCreateInput>;

export const CreateStoriesFromJiraSchema = z.object({
  sprintIds: z.array(z.number()),
});

export const StorySchema = z.object({
  key: z.string(),
  sprintId: z.number().nullable(),
  summary: z.string(),
  storyPoint: z.number().nullable(),
}) satisfies z.ZodType<Story>;

export const StoriesQuerySchema = z.object({
  sprintId: z.number().optional(),
});
