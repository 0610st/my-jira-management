import { Box, Skeleton } from "@mantine/core";
import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useStorySummaries } from "../../../../api/hooks";
import { getAccumulatedSum } from "../../../utils/util";

export const StoryPointStack = () => {
  const { data: storySummaries } = useStorySummaries();

  const accumulatedPoint = useMemo(() => {
    if (!storySummaries) return [];
    return getAccumulatedSum(
      storySummaries.map((storySummary) => storySummary.sum.storyPoint || 0)
    );
  }, [storySummaries]);

  const graphData = useMemo(
    () =>
      storySummaries?.map((storySummary, index) => ({
        sprintId: storySummary.sprintId,
        point: accumulatedPoint[index],
      })),
    [storySummaries, accumulatedPoint]
  );

  if (!storySummaries) {
    return <Skeleton width="100%" height={400} />;
  }

  return (
    <Box sx={{ flex: 1, overflowX: "scroll", overflowY: "hidden" }}>
      <AreaChart
        height={400}
        width={Math.max(storySummaries?.length * 50 + 50, 600)}
        data={graphData}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="sprintId" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="point" stroke="#8884d8" />
      </AreaChart>
    </Box>
  );
};
