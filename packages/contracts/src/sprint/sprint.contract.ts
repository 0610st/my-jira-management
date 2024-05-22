import { initContract } from "@ts-rest/core";
import { SprintSchema } from "./sprint.schema";
import { z } from "zod";
import { ImportJiraSprintResultSchema } from "../jira";
import { SprintSummarySchema } from "./sprint-summary.schema";

const c = initContract();

export const sprintContract = c.router(
  {
    getSprints: {
      method: "GET",
      path: "",
      responses: {
        200: z.array(SprintSchema),
      },
      summary: "Get sprints",
    },
    createSprintWithIssuesFromJira: {
      method: "POST",
      path: "/import",
      body: ImportJiraSprintResultSchema,
      responses: {
        201: null,
      },
      summary: "Create sprint with issues from Jira",
    },
    getSprintSummary: {
      method: "GET",
      path: "/:id/summary",
      pathParams: z.object({
        id: z.string().transform(Number),
      }),
      responses: {
        200: SprintSummarySchema,
      },
      summary: "Get sprint summary",
    },
  },
  {
    pathPrefix: "/sprints",
  },
);
