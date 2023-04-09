import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const GetSprintsSchema = z.object({
  startAt: z.number().optional(),
  state: z.enum(['active', 'closed']).optional(),
});

export class GetSprintsDto extends createZodDto(GetSprintsSchema) {}
