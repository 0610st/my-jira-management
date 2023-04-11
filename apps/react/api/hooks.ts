import { useQuery } from "@tanstack/react-query";
import { Sprint, SprintSummary } from "../types/sprint";
import { Task, TaskSummary } from "../types/task";
import {
  getSprints,
  getSprintSummary,
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
