import { createZodDto } from 'nestjs-zod';
import { StoriesJiraResponseSchema } from 'common-schema';

export class StoriesJiraResponseDto extends createZodDto(
  StoriesJiraResponseSchema,
) {}
