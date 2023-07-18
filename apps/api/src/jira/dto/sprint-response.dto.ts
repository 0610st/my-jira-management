import { SprintValueSchema } from 'contracts';
import { createZodDto } from 'nestjs-zod';

export class SprintResponseDto extends createZodDto(SprintValueSchema) {}
