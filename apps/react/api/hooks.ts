import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";
import { EpicsJiraResponse } from "../types/epic";
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
  createSprintWithIssuesFromJira,
  getJiraEpicTasks,
  getJiraSprintEpics,
  getJiraSprints,
  getSprints,
  getSprintSummary,
  getStorySummaries,
  getTasks,
  getTaskSummaries,
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
    ["jira/sprints"],
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
    ["jira/tasks", epicKey],
    () => getJiraEpicTasks(epicKey),
    {
      staleTime: Infinity,
    }
  );
