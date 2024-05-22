import { createZodDto } from 'nestjs-zod';
import { StoriesJiraResponseSchema } from 'contracts';

export class StoriesJiraResponseDto extends createZodDto(
  StoriesJiraResponseSchema,
) {}
