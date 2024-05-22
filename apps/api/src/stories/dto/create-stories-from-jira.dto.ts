import { createZodDto } from 'nestjs-zod';
import { CreateStoriesFromJiraSchema } from 'contracts';

export class CreateStoriesFromJiraDto extends createZodDto(
  CreateStoriesFromJiraSchema,
) {}
