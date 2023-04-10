import { TasksQuerySchema } from 'common-schema';
import { createZodDto } from 'nestjs-zod';

export class TasksQueryDto extends createZodDto(TasksQuerySchema) {}
