import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreataTasksFromJiraDto } from './dto/create-tasks-from-jira-dto';
import { TasksQueryDto } from './dto/tasks-query-dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(@Query() dto: TasksQueryDto) {
    if (dto.sprintId && typeof dto.sprintId === 'string') {
      dto.sprintId = Number(dto.sprintId);
    }
    return this.tasksService.getTasks(dto);
  }

  @Post()
  createTaskFromJira(@Body() dto: CreataTasksFromJiraDto) {
    return this.tasksService.createTasksFromJira(dto);
  }

  @Get('summaries')
  getTaskSummaries(@Query() dto: TasksQueryDto) {
    if (dto.sprintId && typeof dto.sprintId === 'string') {
      dto.sprintId = Number(dto.sprintId);
    }
    return this.tasksService.getTaskSummaries(dto);
  }
}
