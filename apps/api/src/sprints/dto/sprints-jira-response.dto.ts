import { SprintsJiraResponseSchema } from 'common-schema';
import { createZodDto } from 'nestjs-zod';

export class SprintsJiraResponseDto extends createZodDto(
  SprintsJiraResponseSchema,
) {}
