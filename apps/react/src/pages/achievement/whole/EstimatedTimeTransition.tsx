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
    return [...new Set(taskSummaries.map((task) => task.assignee || "null"))];
  }, [taskSummaries]);

  const sprintIds = useMemo(() => {
    if (!taskSummaries) return [];
    return [...new Set(taskSummaries.map((task) => task.sprintId))];
  }, [taskSummaries]);

  const graphData = useMemo(() => {
    if (!taskSummaries) return [];
    const result: {
      sprintId: number | null;
      assignee: string;
      estimatedTime: number;
    }[] = [];
    sprintIds.forEach((sprintId) => {
      assignees.forEach((assignee) => {
        const estimatedTime = taskSummaries
          .filter((task) => {
            if (assignee === "null" && task.assignee !== null) return false;
            if (assignee !== task.assignee) return false;
            return task.sprintId === sprintId;
          })
          .reduce(
            (prev, current) => prev + (current.sum.estimatedTime || 0),
            0
          );
        result.push({
          sprintId,
          assignee,
          estimatedTime,
        });
      });
    });
    return result;
  }, [assignees, sprintIds, taskSummaries]);

  const handleClick = (e: CategoricalChartState) => {
    navigate(
      e.activeLabel
        ? `/achievement/sprint?sprindId=${e.activeLabel}`
        : "/achievement/sprint"
    );
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
            dataKey={assignee}
            stroke={barColors[index % 10]}
          />
        ))}
      </LineChart>
    </Box>
  );
};
