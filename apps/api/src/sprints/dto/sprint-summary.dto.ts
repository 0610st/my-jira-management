import { createZodDto } from 'nestjs-zod';
import { SprintSummarySchema } from 'common-schema';

export class SprintSummaryDto extends createZodDto(SprintSummarySchema) {}
