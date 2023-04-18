import axios from "axios";
import {
  CreateSprintWithIssuesFromJira,
  GetJiraSprints,
  Sprint,
  SprintsJiraResponse,
  SprintSummary,
} from "../types/sprint";
import { Task, TaskSummary } from "../types/task";
import { StorySummary } from "../types/story";

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