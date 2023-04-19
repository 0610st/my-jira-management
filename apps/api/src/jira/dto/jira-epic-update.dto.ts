import { JiraEpicUpdateSchema } from 'common-schema';
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
