import { createZodDto } from 'nestjs-zod';
import { CreateTasksFromJiraSchema } from 'contracts';

export class CreataTasksFromJiraDto extends createZodDto(
  CreateTasksFromJiraSchema,
) {}
