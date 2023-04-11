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
import { SprintSummary } from "../../../../types/sprint";

interface Props {
  sprintId: number | null;
  width: number;
  height: number;
}
export const CountGraph: FC<Props> = ({ sprintId, width, height }) => {
  const queryClient = useQueryClient();
  const sprintSummary = queryClient.getQueryData<SprintSummary>([
    `${import.meta.env.VITE_API_URL}/sprints/${sprintId}/summary`,
  ]);

  if (!sprintSummary) {
    return <Skeleton width={width} height={height} />;
  }

  return (
    <BarChart width={width} height={height} data={sprintSummary.taskSummaries}>
      <CartesianGrid strokeDasharray="2" />
      <XAxis dataKey="assignee" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey={"count"} fill="#8884d8" />
    </BarChart>
  );
};
