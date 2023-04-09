import { createZodDto } from 'nestjs-zod';
import { TasksJiraResponseSchema } from 'common-schema';

export class TasksJiraResponseDto extends createZodDto(
  TasksJiraResponseSchema,
) {}
