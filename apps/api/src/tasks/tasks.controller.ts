import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreataTasksFromJiraDto } from './dto/create-tasks-from-jira.dto';
import { TasksQueryDto } from './dto/tasks-query.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(@Query('sprintId') sprintId?: string) {
    const dto = new TasksQueryDto();
    if (!isNaN(Number(sprintId))) {
      dto.sprintId = Number(sprintId);
    }
    return this.tasksService.getTasks(dto);
  }

  @Post()
  createTaskFromJira(@Body() dto: CreataTasksFromJiraDto) {
    return this.tasksService.createTasksFromJira(dto);
  }

  @Get('summaries')
  getTaskSummaries(@Query('sprintId') sprintId?: string) {
    const dto = new TasksQueryDto();
    if (!isNaN(Number(sprintId))) {
      dto.sprintId = Number(sprintId);
    }
    return this.tasksService.getTaskSummaries(dto);
  }
}
