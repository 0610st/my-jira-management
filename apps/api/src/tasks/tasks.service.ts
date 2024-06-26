import { Injectable } from '@nestjs/common';
import { JiraSearchDto } from 'src/jira/dto/jira-search.dto';
import { JiraService } from 'src/jira/jira.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { CreataTasksFromJiraDto } from './dto/create-tasks-from-jira.dto';
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
      const dto = new JiraSearchDto();
      dto.conditions.push({ key: 'sprint', value: sprintId + '' });
      const response = await this.jiraService.getJiraTasks(dto);
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

  createTask(dto: CreateTaskDto) {
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
      orderBy: [
        {
          sprintId: 'asc',
        },
        {
          assignee: 'asc',
        },
      ],
    });

    return result.map((item) => ({
      assignee: item.assignee,
      sprintId: item.sprintId,
      sum: item._sum,
      count: item._count.key,
    }));
  }
}
