import { createZodDto } from 'nestjs-zod';
import { CreateTasksFromJiraSchema } from 'common-schema';

export class CreataTasksFromJiraDto extends createZodDto(
  CreateTasksFromJiraSchema,
) {}
