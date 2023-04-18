import { createZodDto } from 'nestjs-zod';
import { EpicsJiraResponseSchema } from 'common-schema';

export class EpicsJiraResponseDto extends createZodDto(
  EpicsJiraResponseSchema,
) {}
