import { ImportJiraSprintResultSchema } from 'common-schema';
import { createZodDto } from 'nestjs-zod';

export class CreateSprintWithIssuesFromJiraDto extends createZodDto(
  ImportJiraSprintResultSchema,
) {}
