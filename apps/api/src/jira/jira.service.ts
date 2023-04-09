import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { GetSprintsDto } from './dto/get-sprints-dto';
import { TasksJiraResponseDto } from './dto/search-task-response.dto';

@Injectable()
export class JiraService {
  project: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.project = this.configService.get(
      'JIRA_PROJECT_NAME',
    ) as unknown as string;
  }

  async getSprints(dto: GetSprintsDto) {
    const { data } = await lastValueFrom(
      this.httpService.get('/rest/agile/1.0/board/2/sprint', {
        params: {
          ...dto,
        },
      }),
    );

    return data;
  }

  async getSprintTasks(sprintId?: number) {
    if (sprintId)
      return this.getSprintIssues<TasksJiraResponseDto>(
        sprintId,
        `issuetype = Task`,
      );
    return this.searchTasks();
  }

  async searchTasks() {
    return this.search<TasksJiraResponseDto>(
      `project = ${this.project} AND issuetype = Task`,
      ['key', 'summary', 'parent', 'assignee', 'status', 'timespent'],
    );
  }

  async getSprintIssues<T>(sprintId: number, jql?: string) {
    const { data } = await lastValueFrom(
      this.httpService.get<T>(`/rest/agile/1.0/sprint/${sprintId}/issue`, {
        params: {
          jql,
        },
      }),
    );
    return data;
  }

  async search<T>(jql: string, fields?: string[]): Promise<T> {
    const { data } = await lastValueFrom(
      this.httpService.post<T>('/rest/api/2/search', {
        jql,
        fields,
      }),
    );
    return data;
  }
}
