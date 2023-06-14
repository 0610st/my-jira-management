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
import { UNASSIGNED } from "./consts";

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

  const getAssignee = (data: TaskSummary) => data.assignee ?? UNASSIGNED;
  const getValue = (data: TaskSummary) => (data.sum.estimatedTime || 0) / 3600;

  return (
    <BarChart width={width} height={height} data={sprintSummary.taskSummaries}>
      <CartesianGrid strokeDasharray="2" />
      <XAxis dataKey={getAssignee} />
      <YAxis unit="h" />
      <Tooltip />
      <Legend />
      <Bar name="消化見積h" unit="h" dataKey={getValue} fill="#8884d8" />
    </BarChart>
  );
};
