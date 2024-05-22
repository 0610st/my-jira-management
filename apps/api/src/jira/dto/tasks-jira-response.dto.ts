import { createZodDto } from 'nestjs-zod';
import { TasksJiraResponseSchema } from 'contracts';

export class TasksJiraResponseDto extends createZodDto(
  TasksJiraResponseSchema,
) {}
