import { createZodDto } from 'nestjs-zod';
import { CreateSprintSchema } from 'common-schema';
import { SprintsJiraResponseDto } from './sprints-jira-response.dto';

export class CreateSprintDto extends createZodDto(CreateSprintSchema) {
  static fromResponseDto(
    responseDto: SprintsJiraResponseDto,
  ): CreateSprintDto[] {
    return responseDto.values.map((value) => {
      const { id, name, startDate, endDate } = value;

      const dto = new CreateSprintDto();
      dto.id = id;
      dto.name = name;
      dto.startDate = startDate;
      dto.endDate = endDate;
      return dto;
    });
  }
}
