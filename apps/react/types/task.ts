import { z } from "zod";
import { TaskSchema } from "common-schema";

export type Task = z.infer<typeof TaskSchema>;
