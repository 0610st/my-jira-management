import { Box, Skeleton } from "@mantine/core";
import { FC, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Bar,
  Tooltip,
  Cell,
} from "recharts";
import { useStorySummaries } from "../../../../api/hooks";
import { StorySummary } from "../../../../types/story";

interface Props {
  sprintId: number | null;
  width: number;
  height: number;
}

export const StoryPointsGraph: FC<Props> = ({ sprintId, width, height }) => {
  const { data: storySummaries } = useStorySummaries();
  const navigate = useNavigate();

  const compPoint = useCallback((prev: StorySummary, current: StorySummary) => {
    if (prev.sum.storyPoint === null) return false;
    if (current.sum.storyPoint === null) return true;
    return prev.sum.storyPoint > current.sum.storyPoint;
  }, []);

  const maxPoint = useMemo(() => {
    if (!storySummaries) return 0;
    const max = storySummaries.reduce(
      (prev, current) => (compPoint(prev, current) ? prev : current),
      { sprintId: null, sum: { storyPoint: null } }
    ).sum.storyPoint;
    return max !== null ? max : 0;
  }, [compPoint, storySummaries]);

  const scopedStorySummaries: StorySummary[] = useMemo(() => {
    if (!storySummaries) return [];
    if (storySummaries.length < 5) return storySummaries;
    const targetIndex = storySummaries.findIndex(
      (storySummary) => storySummary.sprintId === sprintId
    );
    if (targetIndex < 0) return [];
    if (targetIndex < 3) {
      return storySummaries.slice(0, 5);
    }
    if (targetIndex > storySummaries.length - 3) {
      return storySummaries.slice(-5);
    }

    return storySummaries.slice(targetIndex - 2, targetIndex + 3);
  }, [storySummaries, sprintId]);

  const handleClick = (data: StorySummary) => {
    navigate({
      search: data.sprintId === null ? "" : `sprintId=${data.sprintId}`,
    });
  };

  if (!storySummaries) {
    return <Skeleton width={width} height={height} />;
  }

  return (
    <Box w={width} h={height}>
      <BarChart width={width} height={height} data={scopedStorySummaries}>
        <CartesianGrid strokeDasharray="2" />
        <XAxis dataKey="sprintId" />
        <YAxis domain={[0, maxPoint + 5]} />
        <Tooltip />
        <Legend />
        <Bar
          name="storyPoint"
          dataKey="sum.storyPoint"
          fill="#8884d8"
          onClick={handleClick}
        >
          {scopedStorySummaries.map((entry) => (
            <Cell
              key={`cell-${entry.sprintId || "null"}`}
              fill={entry.sprintId === sprintId ? "#8884d8" : "#D0BFFF"}
            />
          ))}
        </Bar>
      </BarChart>
    </Box>
  );
};
