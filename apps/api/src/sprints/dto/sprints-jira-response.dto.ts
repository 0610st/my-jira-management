import { SprintsJiraResponseSchema } from 'contracts';
import { createZodDto } from 'nestjs-zod';

export class SprintsJiraResponseDto extends createZodDto(
  SprintsJiraResponseSchema,
) {}
