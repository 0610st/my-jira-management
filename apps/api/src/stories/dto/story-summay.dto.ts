import { StorySummarySchema } from 'contracts';
import { createZodDto } from 'nestjs-zod';

export class StorySummaryDto extends createZodDto(StorySummarySchema) {}
