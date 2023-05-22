import { Box, Skeleton } from "@mantine/core";
import { useCallback, useMemo } from "react";
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
import { useStorySummaries } from "../../../../api/hooks";
import { StorySummary } from "../../../../types/story";

export const StoryPointTransition = () => {
  const { data: storySummaries } = useStorySummaries();
  const navigate = useNavigate();

  const comp = useCallback((prev: StorySummary, current: StorySummary) => {
    if (prev.sum.storyPoint === null) return false;
    if (current.sum.storyPoint === null) return true;
    return prev.sum.storyPoint > current.sum.storyPoint;
  }, []);

  const maxPoint = useMemo(() => {
    if (!storySummaries) return 0;
    const max = storySummaries.reduce(
      (prev, current) => (comp(prev, current) ? prev : current),
      { sprintId: null, sum: { storyPoint: null } }
    ).sum.storyPoint;
    return max !== null ? max : 0;
  }, [comp, storySummaries]);

  const handleClick = (e: CategoricalChartState) => {
    navigate(`/achievement/sprint?sprindId=${e.activeLabel}`);
  };

  if (!storySummaries) {
    return <Skeleton width="100%" height={400} />;
  }

  return (
    <Box sx={{ flex: 1, overflowX: "scroll", overflowY: "hidden" }}>
      <LineChart
        height={400}
        width={Math.max(storySummaries?.length * 50 + 100, 600)}
        data={storySummaries}
        onClick={handleClick}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="sprintId" />
        <YAxis domain={[0, maxPoint + 5]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sum.storyPoint" stroke="#8884d8" />
      </LineChart>
    </Box>
  );
};
