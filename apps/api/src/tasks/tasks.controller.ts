import { Controller } from '@nestjs/common';
import { TasksQueryDto } from './dto/tasks-query.dto';
import { TasksService } from './tasks.service';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { api } from 'contracts';

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @TsRestHandler(api.tasks.getTasks)
  async getTasks() {
    return tsRestHandler(api.tasks.getTasks, async ({ query }) => {
      const dto = new TasksQueryDto();
      if (!isNaN(Number(query.sprintId))) {
        dto.sprintId = Number(query.sprintId);
      }
      const tasks = await this.tasksService.getTasks(dto);
      return { status: 200, body: tasks };
    });
  }

  @TsRestHandler(api.tasks.getTaskSummaries)
  async getTaskSummaries() {
    return tsRestHandler(api.tasks.getTaskSummaries, async ({ query }) => {
      const dto = new TasksQueryDto();
      if (!isNaN(Number(query.sprintId))) {
        dto.sprintId = Number(query.sprintId);
      }
      const taskSummaries = await this.tasksService.getTaskSummaries(dto);
      return { status: 200, body: taskSummaries };
    });
  }
}
