import { TaskSummarySchema } from 'contracts';
import { createZodDto } from 'nestjs-zod';

export class TaskSummaryDto extends createZodDto(TaskSummarySchema) {}
