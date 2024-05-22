import { createZodDto } from 'nestjs-zod';
import { GetJiraEpicsSchema } from 'contracts';

export class GetJiraEpicsDto extends createZodDto(GetJiraEpicsSchema) {}
