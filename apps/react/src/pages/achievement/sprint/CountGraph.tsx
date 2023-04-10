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

interface Props {
  sprintId: string | null;
  width: number;
  height: number;
}
export const CountGraph: FC<Props> = ({ sprintId, width, height }) => {
  const queryClient = useQueryClient();
  const taskSummaries = queryClient.getQueryData<any[]>([
    `${import.meta.env.VITE_API_URL}/tasks/summaries`,
    sprintId === null ? null : Number(sprintId),
  ]);

  if (!taskSummaries) {
    return <Skeleton width={width} height={height} />;
  }

  return (
    <BarChart width={width} height={height} data={taskSummaries}>
      <CartesianGrid strokeDasharray="2" />
      <XAxis dataKey="assignee" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey={"count"} fill="#8884d8" />
    </BarChart>
  );
};
