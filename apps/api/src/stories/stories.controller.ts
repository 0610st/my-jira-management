import { Controller } from '@nestjs/common';
import { StoriesQueryDto } from './dto/stories-query.dto';
import { StoriesService } from './stories.service';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { api } from 'contracts';

@Controller()
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @TsRestHandler(api.stories.getStories)
  async getStories() {
    return tsRestHandler(api.stories.getStories, async ({ query }) => {
      const dto = new StoriesQueryDto();
      if (!isNaN(Number(query.sprintId))) {
        dto.sprintId = Number(query.sprintId);
      }
      const stories = await this.storiesService.getStories(dto);
      return { status: 200, body: stories };
    });
  }

  @TsRestHandler(api.stories.getStorySummaries)
  async getStorySummaries() {
    return tsRestHandler(api.stories.getStorySummaries, async ({ query }) => {
      const dto = new StoriesQueryDto();
      if (!isNaN(Number(query.sprintId))) {
        dto.sprintId = Number(query.sprintId);
      }
      const storySummaries = await this.storiesService.getStorySummaries(dto);
      return { status: 200, body: storySummaries };
    });
  }
}
