import { StoriesQuerySchema } from 'common-schema';
import { createZodDto } from 'nestjs-zod';

export class StoriesQueryDto extends createZodDto(StoriesQuerySchema) {}
