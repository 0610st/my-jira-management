import { TaskSummarySchema } from 'common-schema';
import { createZodDto } from 'nestjs-zod';

export class TaskSummaryDto extends createZodDto(TaskSummarySchema) {}
