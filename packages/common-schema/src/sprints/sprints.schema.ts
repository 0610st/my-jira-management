import { Prisma, Sprint } from "database";
import { z } from "zod";

export const SprintValueSchema = z.object({
  id: z.number(),
  name: z.string(),
  startDate: z.date(),
  endDate: z.date(),
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
  startAt: z.number().optional(),
  state: z.enum(["active", "closed"]).optional(),
});

export const SprintSchema = z.object({
  id: z.number(),
  name: z.string(),
  startDate: z.date(),
  endDate: z.date(),
}) satisfies z.ZodType<Sprint>;
