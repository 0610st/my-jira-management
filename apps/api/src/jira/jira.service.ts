import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { SprintsJiraResponseDto } from 'src/sprints/dto/sprints-jira-response.dto';
import { EpicsJiraResponseDto } from './dto/epics-jira-response.dto';
import { GetJiraSprintsDto } from './dto/get-sprints.dto';
import { JiraSearchDto } from './dto/jira-search.dto';
import { SprintResponseDto } from './dto/sprint-response.dto';
import { StoriesJiraResponseDto } from './dto/stories-jira-response.dto';
import { TasksJiraResponseDto } from './dto/tasks-jira-response.dto';

const TASK_ISSUE_TYPE = 'Task';
const STORY_ISSUE_TYPE = 'Story';
const EPIC_ISSUE_TYPE = 'エピック';

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

  async getJiraTasks(dto: JiraSearchDto) {
    dto.conditions.push({ key: 'issuetype', value: TASK_ISSUE_TYPE });
    return this.getBoardIssues<TasksJiraResponseDto>(
      JiraSearchDto.createJql(dto),
    );
  }

  async getJiraStories(dto: JiraSearchDto) {
    dto.conditions.push({ key: 'issuetype', value: STORY_ISSUE_TYPE });
    return this.getBoardIssues<StoriesJiraResponseDto>(
      JiraSearchDto.createJql(dto),
    );
  }

  async getJiraEpics(dto: JiraSearchDto) {
    dto.conditions.push({ key: 'issuetype', value: EPIC_ISSUE_TYPE });
    return this.getBoardIssues<EpicsJiraResponseDto>(
      JiraSearchDto.createJql(dto),
    );
  }

  async searchTasks() {
    return this.search<TasksJiraResponseDto>(
      `project = ${this.project} AND issuetype = ${TASK_ISSUE_TYPE}`,
      ['key', 'summary', 'parent', 'assignee', 'status', 'timespent'],
    );
  }

  async searchStories() {
    return this.search<StoriesJiraResponseDto>(
      `project = ${this.project} AND issuetype = ${STORY_ISSUE_TYPE}`,
      ['key', 'summary', 'parent', 'customfield_10016', 'status'],
    );
  }

  async getBoardIssues<T>(jql?: string) {
    const { data } = await lastValueFrom(
      this.httpService.get<T>('/rest/agile/1.0/board/2/issue', {
        params: {
          jql,
        },
      }),
    );
    return data;
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
