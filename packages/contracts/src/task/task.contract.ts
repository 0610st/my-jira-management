import { initContract } from "@ts-rest/core";
import { TaskSchema } from "./task.schema";
import { z } from "zod";
import { TaskSummarySchema } from "./task-summary.schema";

const c = initContract();

export const taskContract = c.router(
  {
    getTasks: {
      method: "GET",
      path: "",
      query: z.object({
        sprintId: z.string().optional(),
      }),
      responses: {
        200: z.array(TaskSchema),
      },
      summary: "Get tasks",
    },
    getTaskSummaries: {
      method: "GET",
      path: "/summaries",
      query: z.object({
        sprintId: z.string().optional(),
      }),
      responses: {
        200: z.array(TaskSummarySchema),
      },
      summary: "Get sprint task summaries",
    },
  },
  {
    pathPrefix: "/tasks",
  },
);
