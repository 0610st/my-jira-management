import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { StoriesQueryDto } from './dto/stories-query.dto';
import { StoriesService } from './stories.service';
import { CreateStoriesFromJiraDto } from './dto/create-stories-from-jira.dto';

@Controller('stories')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @Get()
  getStories(@Query('sprintId') sprintId?: string) {
    const dto = new StoriesQueryDto();
    if (!isNaN(Number(sprintId))) {
      dto.sprintId = Number(sprintId);
    }
    return this.storiesService.getStories(dto);
  }

  @Post()
  createStoryFromJira(@Body() dto: CreateStoriesFromJiraDto) {
    return this.storiesService.createStoriesFromJira(dto);
  }

  @Get('summaries')
  getStorySummaries(@Query('sprintId') sprintId?: string) {
    const dto = new StoriesQueryDto();
    if (!isNaN(Number(sprintId))) {
      dto.sprintId = Number(sprintId);
    }
    return this.storiesService.getStorySummaries(dto);
  }
}
