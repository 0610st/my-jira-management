import { Prisma, Sprint } from "database";
import { z } from "zod";

export const SprintStateSchema = z.enum(["active", "closed", "future"]);

export const SprintValueSchema = z.object({
  id: z.number(),
  name: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  state: SprintStateSchema,
});

export const SprintsJiraResponseSchema = z.object({
  maxResults: z.number(),
  startAt: z.number(),
  isLast: z.boolean(),
  values: z.array(SprintValueSchema),
});

export const CreateSprintSchema = z.object({
  id: z.number(),
  name: z.string(),
  startDate: z.date(),
  endDate: z.date(),
}) satisfies z.ZodType<Prisma.SprintCreateInput>;

export const CreateSprintsFromJiraSchema = z.object({
  startAt: z.union([z.string(), z.string()]).optional(),
  state: SprintStateSchema.optional(),
});

export const SprintSchema = z.object({
  id: z.number(),
  name: z.string(),
  startDate: z.date(),
  endDate: z.date(),
}) satisfies z.ZodType<Sprint>;
