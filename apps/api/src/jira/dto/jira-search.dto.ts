import { JiraSearchSchema } from 'contracts';
import { createZodDto } from 'nestjs-zod';

export class JiraSearchDto extends createZodDto(JiraSearchSchema) {
  static createJql(dto: JiraSearchDto) {
    const jqlArray = dto.conditions.map((condition) => {
      const { key, value, operator } = condition;
      if (!operator) {
        return `${key} = ${value}`;
      }
      if (['in', 'not in'].includes(operator)) {
        return `${key} ${operator} (${value})`;
      }
      return `${key} ${operator} ${value}`;
    });
    return jqlArray.join(' AND ');
  }
}
