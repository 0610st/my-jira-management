import { createZodDto } from 'nestjs-zod';
import { CreateSprintsFromJiraSchema } from 'contracts';

export class CreataSprintsFromJiraDto extends createZodDto(
  CreateSprintsFromJiraSchema,
) {}
