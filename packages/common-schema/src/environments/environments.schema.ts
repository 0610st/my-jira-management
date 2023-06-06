import { z } from "zod";

export const AppEnvironmentSchema = z.object({
  jiraUrlPrefix: z.string(),
});
