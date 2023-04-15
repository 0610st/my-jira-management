import { createZodDto } from 'nestjs-zod';
import { GetJiraSprintsSchema } from 'common-schema';
import { CreataSprintsFromJiraDto } from 'src/sprints/dto/create-sprints-from-jira.dto';

export class GetJiraSprintsDto extends createZodDto(GetJiraSprintsSchema) {
  static fromCreataSprintsFromJiraDto(
    dto: CreataSprintsFromJiraDto,
  ): GetJiraSprintsDto {
    return {
      startAt: dto.startAt ? dto.startAt + '' : undefined,
      state: dto.state,
    };
  }
}
