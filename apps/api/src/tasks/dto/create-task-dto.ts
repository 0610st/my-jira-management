import { createZodDto } from 'nestjs-zod';
import { CreateTaskSchema } from 'common-schema';
import { TasksJiraResponseDto } from 'src/jira/dto/search-task-response.dto';

export class CreateTaskDto extends createZodDto(CreateTaskSchema) {
  static fromResponseDto(responseDto: TasksJiraResponseDto): CreateTaskDto[] {
    return responseDto.issues.map((issue) => {
      const { key, fields } = issue;
      const { assignee, sprint, summary, timespent } = fields;

      const dto = new CreateTaskDto();
      dto.key = key;
      dto.sprintId = sprint ? sprint.id : null;
      dto.summary = summary;
      dto.assignee = assignee ? assignee.displayName : null;
      // TODO dto.estimatedTime = estimatedTime;
      dto.spentTime = timespent;
      return dto;
    });
  }
}
