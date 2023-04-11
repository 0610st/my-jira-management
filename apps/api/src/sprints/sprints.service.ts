import { Injectable } from '@nestjs/common';
import { JiraService } from 'src/jira/jira.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { StoriesQueryDto } from 'src/stories/dto/stories-query.dto';
import { StoriesService } from 'src/stories/stories.service';
import { TasksQueryDto } from 'src/tasks/dto/tasks-query.dto';
import { TasksService } from 'src/tasks/tasks.service';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { CreataSprintsFromJiraDto } from './dto/create-sprints-from-jira.dto';
import { SprintSummaryDto } from './dto/sprint-summary.dto';

@Injectable()
export class SprintsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jiraService: JiraService,
    private readonly tasksService: TasksService,
    private readonly storiesService: StoriesService,
  ) {}

  getSprints() {
    return this.prismaService.sprint.findMany({
      orderBy: { startDate: 'desc' },
    });
  }

  async createSprintsFromJira(dto: CreataSprintsFromJiraDto) {
    const response = await this.jiraService.getSprints(dto);

    const createDtos = CreateSprintDto.fromResponseDto(response);

    return this.prismaService.sprint.createMany({
      data: createDtos.map((dto) => ({
        id: dto.id,
        name: dto.name,
        startDate: dto.startDate,
        endDate: dto.endDate,
      })),
    });
  }

  async getSprintSummary(id: number): Promise<SprintSummaryDto> {
    const taskDto = new TasksQueryDto();
    taskDto.sprintId = id;
    const taskSummaries = await this.tasksService.getTaskSummaries(taskDto);
    const storyDto = new StoriesQueryDto();
    storyDto.sprintId = id;
    const storySummaries = await this.storiesService.getStorySummaries(
      storyDto,
    );
    return { taskSummaries, storySummaries };
  }
}
