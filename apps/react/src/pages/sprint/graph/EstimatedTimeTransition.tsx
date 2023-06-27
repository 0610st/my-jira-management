import { Skeleton } from "@mantine/core";
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
import { Payload } from "recharts/types/component/DefaultTooltipContent";
import { useTaskSummaries } from "../../../api/hooks";
import { SprintLabelForGraph } from "../../../components/label/SprintLabelForGraph";

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
      [key: string]: number | null;
    }[] = [];
    sprintIds.forEach((sprintId) => {
      let sprintResult: {
        [assignee: string]: number;
      } = {};
      assignees.forEach((assignee) => {
        const estimatedTime = taskSummaries
          .filter((task) => {
            // return false if sprintId is null and task.sprintId is not null
            if (sprintId === null && task.sprintId !== null) {
              return false;
            }
            // return false if sprintId is not null and task.sprintId is greater than sprintId
            if (
              sprintId !== null &&
              (task.sprintId === null || task.sprintId > sprintId)
            ) {
              return false;
            }

            // if assignee is 'null'
            if (assignee === "null") {
              return task.assignee === null;
            }
            return assignee === task.assignee;
          })
          .reduce(
            (prev, current) => prev + (current.sum.estimatedTime || 0),
            0
          );
        sprintResult = {
          ...sprintResult,
          [assignee]: Math.round((estimatedTime / 3600) * 100) / 100,
        };
      });
      result.push({
        sprintId,
        ...sprintResult,
      });
    });
    return result;
  }, [assignees, sprintIds, taskSummaries]);

  const handleClick = (e: CategoricalChartState) => {
    navigate(`/sprint/${e.activeLabel ?? ""}`);
  };

  if (!taskSummaries) {
    return <Skeleton width="100%" height={400} />;
  }

  return (
    <LineChart
      height={400}
      width={Math.max(graphData.length * 50 + 100, 600)}
      data={graphData}
      onClick={handleClick}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="sprintId" tick={<SprintLabelForGraph />} />
      <YAxis unit="h" />
      <Tooltip
        itemSorter={(item: Payload<number, string>) => (item.value ?? 0) * -1}
      />
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
  );
};
