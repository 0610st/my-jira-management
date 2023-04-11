import { StorySummarySchema } from 'common-schema';
import { createZodDto } from 'nestjs-zod';

export class StorySummaryDto extends createZodDto(StorySummarySchema) {}
