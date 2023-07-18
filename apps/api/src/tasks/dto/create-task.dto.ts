import { createZodDto } from 'nestjs-zod';
import { CreateTaskSchema } from 'contracts';
import { TasksJiraResponseDto } from 'src/jira/dto/tasks-jira-response.dto';

export class CreateTaskDto extends createZodDto(CreateTaskSchema) {
  static fromResponseDto(responseDto: TasksJiraResponseDto): CreateTaskDto[] {
    return responseDto.issues.map((issue) => {
      const { key, fields } = issue;
      const { assignee, sprint, summary, timespent, timetracking } = fields;

      const dto = new CreateTaskDto();
      dto.key = key;
      dto.sprintId = sprint ? sprint.id : null;
      dto.summary = summary;
      dto.assignee = assignee ? assignee.displayName : null;
      dto.estimatedTime = timetracking.originalEstimateSeconds || null;
      dto.spentTime = timespent;
      return dto;
    });
  }
}
