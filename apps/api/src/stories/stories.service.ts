import { Injectable } from '@nestjs/common';
import { JiraService } from 'src/jira/jira.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { StoriesQueryDto } from './dto/stories-query.dto';

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

    return result.map((item) => ({
      sprintId: item.sprintId,
      sum: item._sum,
    }));
  }
}
