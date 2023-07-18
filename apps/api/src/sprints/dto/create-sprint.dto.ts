import { createZodDto } from 'nestjs-zod';
import { CreateSprintSchema } from 'contracts';
import { SprintsJiraResponseDto } from './sprints-jira-response.dto';
import { SprintResponseDto } from 'src/jira/dto/sprint-response.dto';

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

  static fromResponseDtoSingle(
    responseDto: SprintResponseDto,
  ): CreateSprintDto {
    const { id, name, startDate, endDate } = responseDto;

    const dto = new CreateSprintDto();
    dto.id = id;
    dto.name = name;
    dto.startDate = startDate;
    dto.endDate = endDate;
    return dto;
  }
}
