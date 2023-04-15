import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { SprintsJiraResponseDto } from 'src/sprints/dto/sprints-jira-response.dto';
import { GetJiraSprintsDto } from './dto/get-sprints.dto';
import { SprintResponseDto } from './dto/sprint-response.dto';
import { StoriesJiraResponseDto } from './dto/stories-jira-response.dto';
import { TasksJiraResponseDto } from './dto/tasks-jira-response.dto';

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

  async getJiraSprint(id: number) {
    const { data } = await lastValueFrom(
      this.httpService.get<SprintResponseDto>(`/rest/agile/1.0/sprint/${id}`),
    );

    return data;
  }

  async getJiraSprints(dto: GetJiraSprintsDto) {
    const { data } = await lastValueFrom(
      this.httpService.get<SprintsJiraResponseDto>(
        '/rest/agile/1.0/board/2/sprint',
        {
          params: {
            ...dto,
          },
        },
      ),
    );

    return data;
  }

  async getJiraTasks(sprintId?: number) {
    if (sprintId)
      return this.getSprintIssues<TasksJiraResponseDto>(
        sprintId,
        `issuetype = Task`,
      );
    return this.searchTasks();
  }

  async getJiraStories(sprintId?: number) {
    if (sprintId)
      return this.getSprintIssues<StoriesJiraResponseDto>(
        sprintId,
        `issuetype = Story`,
      );
    return this.searchStories();
  }

  async searchTasks() {
    return this.search<TasksJiraResponseDto>(
      `project = ${this.project} AND issuetype = Task`,
      ['key', 'summary', 'parent', 'assignee', 'status', 'timespent'],
    );
  }

  async searchStories() {
    return this.search<StoriesJiraResponseDto>(
      `project = ${this.project} AND issuetype = Story`,
      ['key', 'summary', 'parent', 'customfield_10016', 'status'],
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
