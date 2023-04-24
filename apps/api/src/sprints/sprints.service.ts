import { Injectable } from '@nestjs/common';
import { GetJiraSprintsDto } from 'src/jira/dto/get-sprints.dto';
import { JiraService } from 'src/jira/jira.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStoryDto } from 'src/stories/dto/create-story.dto';
import { StoriesQueryDto } from 'src/stories/dto/stories-query.dto';
import { StoriesService } from 'src/stories/stories.service';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { TasksQueryDto } from 'src/tasks/dto/tasks-query.dto';
import { TasksService } from 'src/tasks/tasks.service';
import { CreateSprintWithIssuesFromJiraDto } from './dto/create-sprint-with-issues-from-jira.dto';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { CreataSprintsFromJiraDto } from './dto/create-sprints-from-jira.dto';
import { SprintSummaryDto } from './dto/sprint-summary.dto';

const JIRA_FINISH_STATUS = 'Done';

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
    const response = await this.jiraService.getJiraSprints(
      GetJiraSprintsDto.fromCreataSprintsFromJiraDto(dto),
    );

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

  async createSprintWithIssuesFromJira(dto: CreateSprintWithIssuesFromJiraDto) {
    const sprint = await this.jiraService.getJiraSprint(dto.sprintId);
    const createSprintDto = CreateSprintDto.fromResponseDtoSingle(sprint);

    const createTaskDtos: CreateTaskDto[] = [];
    const createStoryDtos: CreateStoryDto[] = [];
    if (dto.withTasks) {
      let taskStartAt = 0;
      let taskTotal = 0;
      do {
        const taskResponse = await this.jiraService.getJiraTasks({
          conditions: [
            { key: 'sprint', value: dto.sprintId + '' },
            { key: 'status', value: JIRA_FINISH_STATUS, operator: 'in' },
          ],
          startAt: taskStartAt,
        });
        taskStartAt += taskResponse.issues.length;
        taskTotal = taskResponse.total;
        createTaskDtos.push(...CreateTaskDto.fromResponseDto(taskResponse));
      } while (taskTotal > createTaskDtos.length);
    }
    if (dto.withStories) {
      let storyStartAt = 0;
      let storyTotal = 0;
      do {
        const storyResponse = await this.jiraService.getJiraStories({
          conditions: [
            { key: 'sprint', value: dto.sprintId + '' },
            { key: 'status', value: JIRA_FINISH_STATUS, operator: 'in' },
          ],
          startAt: storyStartAt,
        });
        storyStartAt += storyResponse.issues.length;
        storyTotal = storyResponse.total;
        createStoryDtos.push(...CreateStoryDto.fromResponseDto(storyResponse));
      } while (storyTotal > createStoryDtos.length);
    }

    await this.prismaService.$transaction(
      async (tx) =>
        await Promise.all([
          tx.sprint.create({
            data: {
              id: createSprintDto.id,
              name: createSprintDto.name,
              startDate: createSprintDto.startDate,
              endDate: createSprintDto.endDate,
            },
          }),
          ...createTaskDtos.map((dto) =>
            tx.task.upsert({
              where: {
                key: dto.key,
              },
              create: {
                key: dto.key,
                summary: dto.summary,
                assignee: dto.assignee,
                estimatedTime: dto.estimatedTime,
                spentTime: dto.spentTime,
                sprintId: createSprintDto.id,
              },
              update: {
                key: dto.key,
                summary: dto.summary,
                assignee: dto.assignee,
                estimatedTime: dto.estimatedTime,
                spentTime: dto.spentTime,
                sprintId: createSprintDto.id,
              },
            }),
          ),
          ...createStoryDtos.map((dto) =>
            tx.story.upsert({
              where: {
                key: dto.key,
              },
              create: {
                key: dto.key,
                summary: dto.summary,
                storyPoint: dto.storyPoint,
                sprintId: createSprintDto.id,
              },
              update: {
                summary: dto.summary,
                storyPoint: dto.storyPoint,
                sprintId: createSprintDto.id,
              },
            }),
          ),
        ]),
    );
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
