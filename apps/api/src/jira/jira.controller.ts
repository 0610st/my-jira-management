import { Controller } from '@nestjs/common';
import { JiraService } from './jira.service';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { api } from 'contracts';

@Controller()
export class JiraController {
  constructor(private readonly jiraService: JiraService) {}

  @TsRestHandler(api.jira.getSprints)
  async getSprints() {
    return tsRestHandler(api.jira.getSprints, async ({ query }) => {
      const sprints = await this.jiraService.getJiraSprints(query);
      return { status: 200, body: sprints };
    });
  }

  @TsRestHandler(api.jira.getTasks)
  async getTasks() {
    return tsRestHandler(api.jira.getTasks, async ({ query }) => {
      const tasks = await this.jiraService.getJiraTasks(query);
      return { status: 200, body: tasks };
    });
  }

  @TsRestHandler(api.jira.updateTask)
  async updateTask() {
    return tsRestHandler(api.jira.updateTask, async ({ params, body }) => {
      await this.jiraService.updateTask(params.key, body);
      return { status: 200, body: null };
    });
  }

  @TsRestHandler(api.jira.createTask)
  async createTask() {
    return tsRestHandler(api.jira.createTask, async ({ body }) => {
      await this.jiraService.createTask(body);
      return { status: 201, body: null };
    });
  }

  @TsRestHandler(api.jira.getEpics)
  async getEpics() {
    return tsRestHandler(api.jira.getEpics, async ({ query }) => {
      const epics = await this.jiraService.getJiraEpics(query);
      return { status: 200, body: epics };
    });
  }

  @TsRestHandler(api.jira.updateEpic)
  async updateEpic() {
    return tsRestHandler(api.jira.updateEpic, async ({ params, body }) => {
      await this.jiraService.updateEpic(params.key, body);
      return { status: 200, body: null };
    });
  }
}
