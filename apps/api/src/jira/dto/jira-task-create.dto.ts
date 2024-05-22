import { JiraTaskCreateSchema } from 'contracts';
import { createZodDto } from 'nestjs-zod';

export class JiraTaskCreateDto extends createZodDto(JiraTaskCreateSchema) {
  static generateRequestBody(dto: JiraTaskCreateDto, projectKey: string) {
    const json = {
      fields: {
        issuetype: {
          name: 'Task',
        },
        summary: dto.name,
        labels: dto.labels,
        parent: {
          key: dto.parentKey,
        },
        customfield_10020: dto.sprintId,
        project: {
          key: projectKey,
        },
      },
    };
    if (dto.estimatedTime) {
      json.fields['timetracking'] = {
        originalEstimate: `${dto.estimatedTime}h`,
      };
    }

    return json;
  }
}
