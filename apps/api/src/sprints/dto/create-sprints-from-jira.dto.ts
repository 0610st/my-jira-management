import { createZodDto } from 'nestjs-zod';
import { CreateSprintsFromJiraSchema } from 'common-schema';

export class CreataSprintsFromJiraDto extends createZodDto(
  CreateSprintsFromJiraSchema,
) {}
