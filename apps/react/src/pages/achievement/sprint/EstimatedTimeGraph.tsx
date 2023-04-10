import { Skeleton } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TaskSummary } from "../../../../types/task";

interface Props {
  sprintId: string | null;
  width: number;
  height: number;
}
export const EstimatedTimeGraph: FC<Props> = ({ sprintId, width, height }) => {
  const queryClient = useQueryClient();
  const taskSummaries = queryClient.getQueryData<TaskSummary[]>([
    `${import.meta.env.VITE_API_URL}/tasks/summaries`,
    sprintId === null ? null : Number(sprintId),
  ]);

  if (!taskSummaries) {
    return <Skeleton width={width} height={height} />;
  }

  const getValue = (data: TaskSummary) => {
    return (data.sum.estimatedTime || 0) / 3600;
  };

  return (
    <BarChart width={width} height={height} data={taskSummaries}>
      <CartesianGrid strokeDasharray="2" />
      <XAxis dataKey="assignee" />
      <YAxis unit="h" />
      <Tooltip />
      <Legend />
      <Bar name="estimatedTime" unit="h" dataKey={getValue} fill="#8884d8" />
    </BarChart>
  );
};
