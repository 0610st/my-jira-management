import { Injectable } from '@nestjs/common';
import { JiraService } from 'src/jira/jira.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStoriesFromJiraDto } from './dto/create-stories-from-jira.dto';
import { CreateStoryDto } from './dto/create-story.dto';
import { StoriesQueryDto } from './dto/stories-query.dto';
import { StorySummaryDto } from './dto/story-summay.dto';

@Injectable()
export class StoriesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jiraService: JiraService,
  ) {}

  async getStories(query: StoriesQueryDto) {
    return this.prismaService.story.findMany({
      where: {
        ...query,
      },
    });
  }

  async createStoriesFromJira(dto: CreateStoriesFromJiraDto) {
    const createDtos: CreateStoryDto[] = [];
    for (const sprintId of dto.sprintIds) {
      const response = await this.getStoriesFromJira(sprintId);
      createDtos.push(...CreateStoryDto.fromResponseDto(response));
    }

    if (createDtos.length === 0) {
      return {
        count: 0,
      };
    }

    return this.prismaService.story.createMany({
      data: createDtos.map((dto) => ({
        key: dto.key,
        summary: dto.summary,
        sprintId: dto.sprintId,
        storyPoint: dto.storyPoint,
      })),
    });
  }

  getStoriesFromJira(sprintId?: number) {
    return this.jiraService.getJiraStories(sprintId);
  }

  createStory(dto: CreateStoryDto) {
    return this.prismaService.story.create({
      data: {
        key: dto.key,
        summary: dto.summary,
        sprintId: dto.sprintId,
        storyPoint: dto.storyPoint,
      },
    });
  }

  async getStorySummaries(query: StoriesQueryDto) {
    const result = await this.prismaService.story.groupBy({
      by: ['sprintId'],
      where: {
        ...query,
      },
      _sum: {
        storyPoint: true,
      },
      orderBy: {
        sprintId: 'asc',
      },
    });

    return result.map((item) => {
      const dto = new StorySummaryDto();
      dto.sprintId = item.sprintId;
      dto.sum = item._sum;
      return dto;
    });
  }
}
