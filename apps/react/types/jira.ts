import { z } from "zod";
import { JiraSearchSchema } from "common-schema";

export type JiraSearch = z.infer<typeof JiraSearchSchema>;
