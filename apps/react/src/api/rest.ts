import axios from "axios";
import {
  CreateSprintWithIssuesFromJira,
  GetJiraSprints,
  Sprint,
  SprintsJiraResponse,
  SprintSummary,
} from "../types/sprint";
import { Task, TasksJiraResponse, TaskSummary } from "../types/task";
import { Story, StorySummary } from "../types/story";
import {
  JiraEpicUpdate,
  JiraSearch,
  JiraTaskCreate,
  JiraTaskUpdate,
} from "../types/jira";
import { EpicsJiraResponse } from "../types/epic";
import { AppEnvironment } from "../types/env";

const apiUrl = import.meta.env.VITE_API_URL as unknown as string;

export const getSprints = async () => {
  const res = await axios.get<Sprint[]>(`${apiUrl}/sprints`);

  return res.data;
};

export const getSprintSummary = async (sprintId: number) => {
  const res = await axios.get<SprintSummary>(
    `${apiUrl}/sprints/${sprintId}/summary`
  );

  return res.data;
};

export const getTasks = async (sprintId?: number) => {
  const res = await axios.get<Task[]>(`${apiUrl}/tasks`, {
    params: {
      sprintId,
    },
  });

  return res.data;
};

export const getTaskSummaries = async (sprintId?: number) => {
  const res = await axios.get<TaskSummary[]>(`${apiUrl}/tasks/summaries`, {
    params: {
      sprintId,
    },
  });

  return res.data;
};

export const getStorySummaries = async (sprintId?: number) => {
  const res = await axios.get<StorySummary[]>(`${apiUrl}/stories/summaries`, {
    params: {
      sprintId,
    },
  });

  return res.data;
};

export const getJiraSprints = async (params: GetJiraSprints) => {
  const res = await axios.get<SprintsJiraResponse>(`${apiUrl}/jira/sprints`, {
    params,
  });

  return res.data;
};

export const createSprintWithIssuesFromJira = async (
  params: CreateSprintWithIssuesFromJira
) => {
  await axios.post<void>(`${apiUrl}/sprints/import`, params);
};

export const getJiraSprintEpics = async (sprintId: number, open?: boolean) => {
  const params: JiraSearch = {
    conditions: [{ key: "sprint", value: `${sprintId}` }],
  };
  if (open) {
    params.conditions.push({
      key: "status",
      value: "Done",
      operator: "not in",
    });
  }

  const res = await axios.post<EpicsJiraResponse>(
    `${apiUrl}/jira/epics`,
    params
  );
  return res.data;
};

export const getJiraEpicTasks = async (epicKey: string, open?: boolean) => {
  const params: JiraSearch = {
    conditions: [{ key: "parent", value: epicKey }],
  };
  if (open) {
    params.conditions.push({
      key: "status",
      value: "Done",
      operator: "not in",
    });
  }

  const res = await axios.post<TasksJiraResponse>(
    `${apiUrl}/jira/tasks/search`,
    params
  );

  return res.data;
};

export const updateJiraTask = async (key: string, body: JiraTaskUpdate) => {
  await axios.put<void>(`${apiUrl}/jira/tasks/${key}`, body);
};

export const createJiraTask = async (body: JiraTaskCreate) => {
  await axios.post<void>(`${apiUrl}/jira/tasks`, body);
};

export const updateJiraEpic = async (key: string, body: JiraEpicUpdate) => {
  await axios.put<void>(`${apiUrl}/jira/epics/${key}`, body);
};

export const getAppEnvs = async () => {
  const res = await axios.get<AppEnvironment>(`${apiUrl}/environments`);

  return res.data;
};

export const getStories = async (sprintId?: number) => {
  const res = await axios.get<Story[]>(`${apiUrl}/stories`, {
    params: {
      sprintId,
    },
  });

  return res.data;
};
