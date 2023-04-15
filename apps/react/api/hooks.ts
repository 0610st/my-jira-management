import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";
import {
  CreateSprintWithIssuesFromJira,
  GetJiraSprints,
  Sprint,
  SprintsJiraResponse,
  SprintSummary,
} from "../types/sprint";
import { StorySummary } from "../types/story";
import { Task, TaskSummary } from "../types/task";
import {
  createSprintWithIssuesFromJira,
  getJiraSprints,
  getSprints,
  getSprintSummary,
  getStorySummaries,
  getTasks,
  getTaskSummaries,
} from "./rest";

export const useSprints = () =>
  useQuery<Sprint[], Error>(
    [`${import.meta.env.VITE_API_URL}/sprints`],
    getSprints,
    { staleTime: Infinity }
  );

export const useSprintSummary = (sprintId: number, enabled: boolean) =>
  useQuery<SprintSummary, Error>(
    [`${import.meta.env.VITE_API_URL}/sprints/${sprintId}/summary`],
    () => getSprintSummary(sprintId),
    { staleTime: Infinity, enabled }
  );

export const useTasks = (sprintId?: number) =>
  useQuery<Task[], Error>(
    [`${import.meta.env.VITE_API_URL}/tasks`, sprintId],
    () => getTasks(sprintId)
  );

export const useTaskSummaries = (sprintId?: number) =>
  useQuery<TaskSummary[], Error>(
    [`${import.meta.env.VITE_API_URL}/tasks/summaries`, sprintId],
    () => getTaskSummaries(sprintId)
  );

export const useStorySummaries = (sprintId?: number) =>
  useQuery<StorySummary[], Error>(
    [`${import.meta.env.VITE_API_URL}/stories/summaries`, sprintId],
    () => getStorySummaries(sprintId),
    {
      staleTime: Infinity,
    }
  );

export const useJiraSprints = (params: GetJiraSprints, enabled: boolean) =>
  useQuery<SprintsJiraResponse, Error>(
    [`${import.meta.env.VITE_API_URL}/jira/sprints`],
    () => getJiraSprints(params),
    {
      staleTime: Infinity,
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
