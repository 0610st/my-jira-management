import { initContract } from "@ts-rest/core";
import { AppEnvironmentSchema } from "./environment.schema";

const c = initContract();

export const environmentContract = c.router(
  {
    getEnvironment: {
      method: "GET",
      path: "",
      responses: {
        200: AppEnvironmentSchema,
      },
      summary: "Get the environment variables",
    },
  },
  {
    pathPrefix: "/environments",
  },
);
