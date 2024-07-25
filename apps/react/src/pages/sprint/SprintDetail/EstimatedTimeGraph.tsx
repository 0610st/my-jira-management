import { Box, Skeleton, Text } from "@mantine/core";
import { FC, useMemo } from "react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import { useSprintSummary } from "@/api/hooks";
import { UNASSIGNED } from "./consts";

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

interface Props {
  sprintId: number | null;
  width: number;
  height: number;
}
export const EstimatedTimeGraph: FC<Props> = ({ sprintId, width, height }) => {
  const { data: sprintSummary } = useSprintSummary(
    Number(sprintId),
    sprintId !== null,
  );

  const graphData = useMemo(
    (): { name: string; value: number }[] | undefined =>
      sprintSummary?.body.taskSummaries
        .map((taskSummary) => ({
          name: taskSummary.assignee ?? UNASSIGNED,
          value:
            Math.round(((taskSummary?.sum.estimatedTime ?? 0) / 3600) * 10) /
            10,
        }))
        .sort((a, b) => b.value - a.value),
    [sprintSummary],
  );

  if (!sprintSummary) {
    return <Skeleton width={width} height={height} />;
  }

  return (
    <Box>
      <PieChart width={width} height={height}>
        <Pie data={graphData} innerRadius={80} dataKey="value" label>
          {graphData?.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={barColors[index % barColors.length]}
            />
          ))}
        </Pie>
        <Tooltip wrapperStyle={{ zIndex: 2 }} />
      </PieChart>
      <Box
        sx={{
          zIndex: 1,
          position: "relative",
          top: (height / 2) * -1 - 25,
          left: width / 2 - 50,
          width: 100,
          height: 0,
          textAlign: "center",
        }}
      >
        <Text>消化見積h</Text>
        <Text>
          {graphData?.reduce((sum, current) => current.value + sum, 0)}
        </Text>
      </Box>
    </Box>
  );
};
