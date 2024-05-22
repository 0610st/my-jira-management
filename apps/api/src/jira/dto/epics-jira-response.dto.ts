import { createZodDto } from 'nestjs-zod';
import { EpicsJiraResponseSchema } from 'contracts';

export class EpicsJiraResponseDto extends createZodDto(
  EpicsJiraResponseSchema,
) {}
