import { z } from "zod";
import {
  JiraEpicUpdateSchema,
  JiraSearchSchema,
  JiraTaskCreateSchema,
  JiraTaskUpdateSchema,
} from "contracts";

export type JiraSearch = z.infer<typeof JiraSearchSchema>;

export type JiraTaskUpdate = z.infer<typeof JiraTaskUpdateSchema>;

export type JiraTaskCreate = z.infer<typeof JiraTaskCreateSchema>;

export type JiraEpicUpdate = z.infer<typeof JiraEpicUpdateSchema>;
