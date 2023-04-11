import { createZodDto } from 'nestjs-zod';
import { CreateStorySchema } from 'common-schema';
import { StoriesJiraResponseDto } from 'src/jira/dto/stories-jira-response.dto';

export class CreateStoryDto extends createZodDto(CreateStorySchema) {
  static fromResponseDto(
    responseDto: StoriesJiraResponseDto,
  ): CreateStoryDto[] {
    return responseDto.issues.map((issue) => {
      const { key, fields } = issue;
      const { sprint, summary, customfield_10016 } = fields;

      const dto = new CreateStoryDto();
      dto.key = key;
      dto.sprintId = sprint ? sprint.id : null;
      dto.summary = summary;
      dto.storyPoint = customfield_10016;
      return dto;
    });
  }
}
