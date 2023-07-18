import { TasksQuerySchema } from 'contracts';
import { createZodDto } from 'nestjs-zod';

export class TasksQueryDto extends createZodDto(TasksQuerySchema) {}
