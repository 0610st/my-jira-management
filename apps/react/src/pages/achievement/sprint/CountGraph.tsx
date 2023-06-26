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
import { useSprintSummary } from "../../../api/hooks";
import { TaskSummary } from "../../../types/task";
import { UNASSIGNED } from "./consts";

interface Props {
  sprintId: number | null;
  width: number;
  height: number;
}
export const CountGraph: FC<Props> = ({ sprintId, width, height }) => {
  const { data: sprintSummary } = useSprintSummary(
    Number(sprintId),
    sprintId !== null
  );

  if (!sprintSummary) {
    return <Skeleton width={width} height={height} />;
  }

  const getAssignee = (data: TaskSummary) => data.assignee ?? UNASSIGNED;

  return (
    <BarChart width={width} height={height} data={sprintSummary.taskSummaries}>
      <CartesianGrid strokeDasharray="2" />
      <XAxis dataKey={getAssignee} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar name="消化タスク数" dataKey="count" fill="#8884d8" />
    </BarChart>
  );
};
