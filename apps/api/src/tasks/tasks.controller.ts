import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreataTasksFromJiraDto } from './dto/create-tasks-from-jira-dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks() {
    return this.tasksService.getTasks();
  }

  @Post()
  createTaskFromJira(@Body() dto: CreataTasksFromJiraDto) {
    return this.tasksService.createTasksFromJira(dto);
  }
}
