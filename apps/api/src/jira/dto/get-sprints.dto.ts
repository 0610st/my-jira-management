import { createZodDto } from 'nestjs-zod';
import { GetJiraSprintsSchema } from 'contracts';
import { CreataSprintsFromJiraDto } from 'src/sprints/dto/create-sprints-from-jira.dto';

export class GetJiraSprintsDto extends createZodDto(GetJiraSprintsSchema) {
  static fromCreataSprintsFromJiraDto(
    dto: CreataSprintsFromJiraDto,
  ): GetJiraSprintsDto {
    return {
      startAt: dto.startAt,
      state: dto.state,
    };
  }
}
