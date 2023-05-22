import { Box, Skeleton } from "@mantine/core";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CategoricalChartState } from "recharts/types/chart/generateCategoricalChart";
import { useTaskSummaries } from "../../../../api/hooks";
import { getAccumulatedSum } from "../../../utils/util";

const barColors = [
  "#4263EB",
  "#0CA678",
  "#F59F00",
  "#FA5252",
  "#CC5DE8",
  "#7048E8",
  "#F59F00",
  "#2B8A3E",
  "#364FC7",
  "#101113",
];

export const EstimatedTimeTransition = () => {
  const { data: taskSummaries } = useTaskSummaries();
  const navigate = useNavigate();

  const assignees = useMemo(() => {
    if (!taskSummaries) return [];
    return [...new Set(taskSummaries.map((task) => task.assignee))];
  }, [taskSummaries]);

  const graphData = useMemo(() => {
    if (!taskSummaries) return [];

    const sprintIds = [...new Set(taskSummaries.map((task) => task.sprintId))];
    const sprintsAssigneeTime: Array<{
      [key: string]: any;
    }> = sprintIds.map((sprintId) => {
      const tasks = taskSummaries.filter((task) => task.sprintId === sprintId);
      return {
        sprintId,
        ...assignees.reduce((acc, assignee) => {
          const task = tasks.find((task) => task.assignee === assignee);
          return {
            ...acc,
            [`${assignee}`]: task?.sum.estimatedTime || 0,
          };
        }, {}),
      };
    });
    const assigneegetAccumulatedTime = assignees.map((assignee) => {
      const key = `${assignee}`;
      const times = sprintsAssigneeTime.map((sprint) => sprint[key]);
      return getAccumulatedSum(times);
    });
    return sprintIds.map((sprintId, sprintIndex) => ({
      sprintId,
      ...assignees.reduce(
        (acc, assignee, index) => ({
          ...acc,
          [`${assignee}`]:
            assigneegetAccumulatedTime[index][sprintIndex] / 3600,
        }),
        {}
      ),
    }));
  }, [assignees, taskSummaries]);

  const handleClick = (e: CategoricalChartState) => {
    navigate(`/achievement/sprint?sprindId=${e.activeLabel}`);
  };

  if (!taskSummaries) {
    return <Skeleton width="100%" height={400} />;
  }

  return (
    <Box sx={{ flex: 1, overflowX: "scroll", overflowY: "hidden" }}>
      <LineChart
        height={400}
        width={Math.max(graphData.length * 50 + 100, 600)}
        data={graphData}
        onClick={handleClick}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="sprintId" />
        <YAxis unit="h" />
        <Tooltip />
        <Legend />
        {assignees.map((assignee, index) => (
          <Line
            key={assignee}
            type="monotone"
            unit="h"
            dataKey={`${assignee}`}
            stroke={barColors[index % 10]}
          />
        ))}
      </LineChart>
    </Box>
  );
};
