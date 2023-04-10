import axios from "axios";
import { Sprint } from "../types/sprint";
import { Task, TaskSummary } from "../types/task";

export const getSprints = async () => {
  const res = await axios.get<Sprint[]>(
    `${import.meta.env.VITE_API_URL}/sprints`
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
