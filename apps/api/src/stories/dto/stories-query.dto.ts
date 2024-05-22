import { StoriesQuerySchema } from 'contracts';
import { createZodDto } from 'nestjs-zod';

export class StoriesQueryDto extends createZodDto(StoriesQuerySchema) {}
