import { initContract } from "@ts-rest/core";
import { StorySchema } from "./story.schema";
import { StorySummarySchema } from "./story-summary.schema";
import { z } from "zod";

const c = initContract();

export const storyContract = c.router(
  {
    getStories: {
      method: "GET",
      path: "",
      query: z.object({
        sprintId: z.string().optional(),
      }),
      responses: {
        200: z.array(StorySchema),
      },
      summary: "Get stories",
    },
    getStorySummaries: {
      method: "GET",
      path: "/summaries",
      query: z.object({
        sprintId: z.string().optional(),
      }),
      responses: {
        200: z.array(StorySummarySchema),
      },
      summary: "Get sprint story summaries",
    },
  },
  {
    pathPrefix: "/stories",
  },
);
