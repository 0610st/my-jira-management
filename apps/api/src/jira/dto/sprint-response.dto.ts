import { SprintValueSchema } from 'common-schema';
import { createZodDto } from 'nestjs-zod';

export class SprintResponseDto extends createZodDto(SprintValueSchema) {}
