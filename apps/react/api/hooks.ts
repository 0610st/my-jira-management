import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";
import { EpicsJiraResponse } from "../types/epic";
import { JiraEpicUpdate, JiraTaskCreate, JiraTaskUpdate } from "../types/jira";
import {
  CreateSprintWithIssuesFromJira,
  GetJiraSprints,
  Sprint,
  SprintsJiraResponse,
  SprintSummary,
} from "../types/sprint";
import { StorySummary } from "../types/story";
import { Task, TasksJiraResponse, TaskSummary } from "../types/task";
import {
  createJiraTask,
  createSprintWithIssuesFromJira,
  getJiraEpicTasks,
  getJiraSprintEpics,
  getJiraSprints,
  getSprints,
  getSprintSummary,
  getStorySummaries,
  getTasks,
  getTaskSummaries,
  updateJiraEpic,
  updateJiraTask,
} from "./rest";

export const useSprints = () =>
  useQuery<Sprint[], Error>(["sprints"], getSprints, { staleTime: Infinity });

export const useSprintSummary = (sprintId: number, enabled: boolean) =>
  useQuery<SprintSummary, Error>(
    [`sprints/${sprintId}/summary`],
    () => getSprintSummary(sprintId),
    { staleTime: Infinity, enabled }
  );

export const useTasks = (sprintId?: number) =>
  useQuery<Task[], Error>(["tasks", sprintId], () => getTasks(sprintId));

export const useTaskSummaries = (sprintId?: number) =>
  useQuery<TaskSummary[], Error>(["tasks/summaries", sprintId], () =>
    getTaskSummaries(sprintId)
  );

export const useStorySummaries = (sprintId?: number) =>
  useQuery<StorySummary[], Error>(
    ["stories/summaries", sprintId],
    () => getStorySummaries(sprintId),
    {
      staleTime: Infinity,
    }
  );

export const useJiraSprints = (params: GetJiraSprints, enabled: boolean) =>
  useQuery<SprintsJiraResponse, Error>(
    ["jira/sprints", params.startAt],
    () => getJiraSprints(params),
    {
      staleTime: Infinity,
      enabled,
    }
  );

export const useJiraFutureSprints = (enabled: boolean) =>
  useQuery<SprintsJiraResponse, Error>(
    ["jira/sprints", "future"],
    () => getJiraSprints({ state: "future" }),
    {
      cacheTime: 0,
      enabled,
    }
  );

export const useCreateSprintWithIssuesFromJira = (
  options: UseMutationOptions<void, Error, CreateSprintWithIssuesFromJira>
) =>
  useMutation<void, Error, CreateSprintWithIssuesFromJira>(
    (params) => createSprintWithIssuesFromJira(params),
    options
  );

export const useJiraSprintEpics = (sprintId: number) =>
  useQuery<EpicsJiraResponse, Error>(
    ["jira/epics", sprintId],
    () => getJiraSprintEpics(sprintId),
    {
      staleTime: Infinity,
    }
  );

export const useJiraEpicTasks = (epicKey: string) =>
  useQuery<TasksJiraResponse, Error>(
    ["jira/tasks/search", epicKey],
    () => getJiraEpicTasks(epicKey),
    {
      staleTime: Infinity,
    }
  );

export interface UpdateJiraTaskProps {
  key: string;
  body: JiraTaskUpdate;
}

export const useUpdateJiraTask = (
  options: UseMutationOptions<void, Error, UpdateJiraTaskProps>
) =>
  useMutation<void, Error, UpdateJiraTaskProps>(
    ({ key, body }) => updateJiraTask(key, body),
    options
  );

export const useCreateJiraTask = (
  options: UseMutationOptions<void, Error, JiraTaskCreate>
) =>
  useMutation<void, Error, JiraTaskCreate>(
    (body) => createJiraTask(body),
    options
  );

export interface UpdateJiraEpicProps {
  key: string;
  body: JiraEpicUpdate;
}

export const useUpdateJiraEpic = (
  options: UseMutationOptions<void, Error, UpdateJiraEpicProps>
) =>
  useMutation<void, Error, UpdateJiraEpicProps>(
    ({ key, body }) => updateJiraEpic(key, body),
    options
  );
