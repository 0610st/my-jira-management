import { useQuery } from "@tanstack/react-query";
import { Sprint } from "../types/sprint";
import { Task, TaskSummary } from "../types/task";
import { getSprints, getTasks, getTaskSummaries } from "./rest";

export const useSprints = () =>
  useQuery<Sprint[], Error>(
    [`${import.meta.env.VITE_API_URL}/sprints`],
    getSprints,
    { staleTime: Infinity }
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
