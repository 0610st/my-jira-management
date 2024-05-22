import { ImportJiraSprintResultSchema } from 'contracts';
import { createZodDto } from 'nestjs-zod';

export class CreateSprintWithIssuesFromJiraDto extends createZodDto(
  ImportJiraSprintResultSchema,
) {}
