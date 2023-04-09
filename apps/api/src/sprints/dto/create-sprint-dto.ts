import { createZodDto } from 'nestjs-zod';
import { CreateSprintSchema } from 'common-schema';
import { TasksJiraResponseDto } from 'src/jira/dto/search-task-response.dto';

export class CreateSprintDto extends createZodDto(CreateSprintSchema) {
  static fromResponseDto(responseDto: TasksJiraResponseDto): CreateSprintDto[] {
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
