import { createZodDto } from 'nestjs-zod';
import { GetJiraEpicsSchema } from 'common-schema';

export class GetJiraEpicsDto extends createZodDto(GetJiraEpicsSchema) {}
