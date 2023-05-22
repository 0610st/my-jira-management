import { Skeleton } from "@mantine/core";
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
import { useSprintSummary } from "../../../../api/hooks";
import { TaskSummary } from "../../../../types/task";

interface Props {
  sprintId: number | null;
  width: number;
  height: number;
}
export const EstimatedTimeGraph: FC<Props> = ({ sprintId, width, height }) => {
  const { data: sprintSummary } = useSprintSummary(
    Number(sprintId),
    sprintId !== null
  );

  if (!sprintSummary) {
    return <Skeleton width={width} height={height} />;
  }

  const getValue = (data: TaskSummary) => (data.sum.estimatedTime || 0) / 3600;

  return (
    <BarChart width={width} height={height} data={sprintSummary.taskSummaries}>
      <CartesianGrid strokeDasharray="2" />
      <XAxis dataKey="assignee" />
      <YAxis unit="h" />
      <Tooltip />
      <Legend />
      <Bar name="estimatedTime" unit="h" dataKey={getValue} fill="#8884d8" />
    </BarChart>
  );
};
