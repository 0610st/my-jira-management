import { Injectable } from '@nestjs/common';
import { JiraService } from 'src/jira/jira.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { CreataTasksFromJiraDto } from './dto/create-tasks-from-jira.dto';
import { TaskSummaryDto } from './dto/task-summay.dto';
import { TasksQueryDto } from './dto/tasks-query.dto';

@Injectable()
export class TasksService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jiraService: JiraService,
  ) {}

  async getTasks(query: TasksQueryDto) {
    return this.prismaService.task.findMany({
      where: {
        ...query,
      },
    });
  }

  async createTasksFromJira(dto: CreataTasksFromJiraDto) {
    const createDtos: CreateTaskDto[] = [];
    for (const sprintId of dto.sprintIds) {
      const response = await this.getTasksFromJira(sprintId);
      createDtos.push(...CreateTaskDto.fromResponseDto(response));
    }

    if (createDtos.length === 0) {
      return {
        count: 0,
      };
    }

    return this.prismaService.task.createMany({
      data: createDtos.map((dto) => ({
        key: dto.key,
        summary: dto.summary,
        assignee: dto.assignee,
        spentTime: dto.spentTime,
        sprintId: dto.sprintId,
        estimatedTime: dto.estimatedTime,
      })),
    });
  }

  getTasksFromJira(sprintId?: number) {
    return this.jiraService.getSprintTasks(sprintId);
  }

  async createTask(dto: CreateTaskDto) {
    return this.prismaService.task.create({
      data: {
        key: dto.key,
        summary: dto.summary,
        assignee: dto.assignee,
        spentTime: dto.spentTime,
        sprintId: dto.sprintId,
        estimatedTime: dto.estimatedTime,
      },
    });
  }

  async getTaskSummaries(query: TasksQueryDto) {
    const result = await this.prismaService.task.groupBy({
      by: ['assignee', 'sprintId'],
      where: {
        ...query,
      },
      _sum: {
        spentTime: true,
        estimatedTime: true,
      },
      _count: {
        key: true,
      },
    });

    return result.map((item) => {
      const dto = new TaskSummaryDto();
      dto.assignee = item.assignee;
      dto.sprintId = item.sprintId;
      dto.sum = item._sum;
      dto.count = item._count.key;
      return dto;
    });
  }
}
