import axios from "axios";
import {
  CreateSprintWithIssuesFromJira,
  GetJiraSprints,
  Sprint,
  SprintsJiraResponse,
  SprintSummary,
} from "../types/sprint";
import { Task, TasksJiraResponse, TaskSummary } from "../types/task";
import { StorySummary } from "../types/story";
import {
  JiraEpicUpdate,
  JiraSearch,
  JiraTaskCreate,
  JiraTaskUpdate,
} from "../types/jira";
import { EpicsJiraResponse } from "../types/epic";

export const getSprints = async () => {
  const res = await axios.get<Sprint[]>(
    `${import.meta.env.VITE_API_URL}/sprints`
  );

  return res.data;
};

export const getSprintSummary = async (sprintId: number) => {
  const res = await axios.get<SprintSummary>(
    `${import.meta.env.VITE_API_URL}/sprints/${sprintId}/summary`
  );

  return res.data;
};

export const getTasks = async (sprintId?: number) => {
  const res = await axios.get<Task[]>(`${import.meta.env.VITE_API_URL}/tasks`, {
    params: {
      sprintId,
    },
  });

  return res.data;
};

export const getTaskSummaries = async (sprintId?: number) => {
  const res = await axios.get<TaskSummary[]>(
    `${import.meta.env.VITE_API_URL}/tasks/summaries`,
    {
      params: {
        sprintId,
      },
    }
  );

  return res.data;
};

export const getStorySummaries = async (sprintId?: number) => {
  const res = await axios.get<StorySummary[]>(
    `${import.meta.env.VITE_API_URL}/stories/summaries`,
    {
      params: {
        sprintId,
      },
    }
  );

  return res.data;
};

export const getJiraSprints = async (params: GetJiraSprints) => {
  const res = await axios.get<SprintsJiraResponse>(
    `${import.meta.env.VITE_API_URL}/jira/sprints`,
    {
      params,
    }
  );

  return res.data;
};

export const createSprintWithIssuesFromJira = async (
  params: CreateSprintWithIssuesFromJira
) => {
  await axios.post<void>(
    `${import.meta.env.VITE_API_URL}/sprints/import`,
    params
  );
};

export const getJiraSprintEpics = async (sprintId: number, open?: boolean) => {
  const params: JiraSearch = {
    conditions: [{ key: "sprint", value: sprintId + "" }],
  };
  if (open) {
    params.open = true;
  }
  const res = await axios.post<EpicsJiraResponse>(
    `${import.meta.env.VITE_API_URL}/jira/epics`,
    params
  );

  return res.data;
};

export const getJiraEpicTasks = async (epicKey: string, open?: boolean) => {
  const params: JiraSearch = {
    conditions: [{ key: "parent", value: epicKey }],
  };

  if (open) {
    params.open = true;
  }
  const res = await axios.post<TasksJiraResponse>(
    `${import.meta.env.VITE_API_URL}/jira/tasks/search`,
    params
  );

  return res.data;
};

export const updateJiraTask = async (key: string, body: JiraTaskUpdate) => {
  await axios.put<void>(
    `${import.meta.env.VITE_API_URL}/jira/tasks/${key}`,
    body
  );
};

export const createJiraTask = async (body: JiraTaskCreate) => {
  await axios.post<void>(`${import.meta.env.VITE_API_URL}/jira/tasks`, body);
};

export const updateJiraEpic = async (key: string, body: JiraEpicUpdate) => {
  await axios.put<void>(
    `${import.meta.env.VITE_API_URL}/jira/epics/${key}`,
    body
  );
};
