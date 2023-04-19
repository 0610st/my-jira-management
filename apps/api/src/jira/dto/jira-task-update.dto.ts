import { JiraTaskUpdateSchema } from 'common-schema';
import { createZodDto } from 'nestjs-zod';

export class JiraTaskUpdateDto extends createZodDto(JiraTaskUpdateSchema) {
  static generateRequestBody(dto: JiraTaskUpdateDto) {
    const json = {
      fields: {
        labels: dto.labels,
        customfield_10020: dto.sprintId,
      },
    };

    return json;
  }
}
