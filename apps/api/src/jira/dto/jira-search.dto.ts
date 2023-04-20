import { JiraSearchSchema } from 'common-schema';
import { createZodDto } from 'nestjs-zod';

export class JiraSearchDto extends createZodDto(JiraSearchSchema) {
  static createJql(dto: JiraSearchDto) {
    const jqlArray = dto.conditions.map(
      (condition) => `${condition.key} = ${condition.value}`,
    );
    if (dto.open) {
      jqlArray.push('status not in (done)');
    }
    return jqlArray.join(' AND ');
  }
}
