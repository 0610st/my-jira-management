import { initContract } from "@ts-rest/core";
import { SprintsJiraResponseSchema } from "../sprint";
import {
  GetJiraSprintsSchema,
  JiraEpicUpdateSchema,
  JiraSearchSchema,
  JiraTaskCreateSchema,
  JiraTaskUpdateSchema,
} from "./jira.schema";
import { TasksJiraResponseSchema } from "../task";
import { z } from "zod";
import { EpicsJiraResponseSchema } from "../epics";

const c = initContract();

export const jiraContract = c.router(
  {
    getSprints: {
      method: "GET",
      path: "/sprints",
      responses: {
        200: SprintsJiraResponseSchema,
      },
      query: GetJiraSprintsSchema,
    },
    getTasks: {
      method: "GET",
      path: "/tasks/search",
      responses: {
        200: TasksJiraResponseSchema,
      },
      query: JiraSearchSchema,
    },
    updateTask: {
      method: "PUT",
      path: "/tasks/:key",
      responses: {
        200: null,
      },
      pathParams: z.object({
        key: z.string(),
      }),
      body: JiraTaskUpdateSchema,
    },
    createTask: {
      method: "POST",
      path: "/tasks",
      responses: {
        201: null,
      },
      body: JiraTaskCreateSchema,
    },
    getEpics: {
      method: "GET",
      path: "/epics",
      responses: {
        200: EpicsJiraResponseSchema,
      },
      query: JiraSearchSchema,
    },
    updateEpic: {
      method: "PUT",
      path: "/epics/:key",
      responses: {
        200: null,
      },
      pathParams: z.object({
        key: z.string(),
      }),
      body: JiraEpicUpdateSchema,
    },
  },
  {
    pathPrefix: "/jira",
  },
);
