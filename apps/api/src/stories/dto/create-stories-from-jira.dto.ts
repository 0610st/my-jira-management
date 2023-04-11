import { createZodDto } from 'nestjs-zod';
import { CreateStoriesFromJiraSchema } from 'common-schema';

export class CreateStoriesFromJiraDto extends createZodDto(
  CreateStoriesFromJiraSchema,
) {}
