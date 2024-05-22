import { JiraEpicUpdateSchema } from 'contracts';
import { createZodDto } from 'nestjs-zod';

export class JiraEpicUpdateDto extends createZodDto(JiraEpicUpdateSchema) {
  static generateRequestBody(dto: JiraEpicUpdateDto) {
    const json = {
      fields: {
        labels: dto.labels,
      },
    };

    return json;
  }
}
