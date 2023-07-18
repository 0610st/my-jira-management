import { createZodDto } from 'nestjs-zod';
import { SprintSummarySchema } from 'contracts';

export class SprintSummaryDto extends createZodDto(SprintSummarySchema) {}
