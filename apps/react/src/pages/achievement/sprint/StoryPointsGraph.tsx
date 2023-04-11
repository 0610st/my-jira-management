import { Box, Skeleton } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
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
import { StorySummary } from "../../../../types/story";

interface Props {
  sprintId: number | null;
  width: number;
  height: number;
}

export const StoryPointsGraph: FC<Props> = ({ sprintId, width, height }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const storySummaries = queryClient.getQueryData<StorySummary[]>([
    `${import.meta.env.VITE_API_URL}/stories/summaries`,
    undefined,
  ]);

  const compPoint = useCallback((prev: StorySummary, current: StorySummary) => {
    if (prev.sum.storyPoint === null) return false;
    if (current.sum.storyPoint === null) return true;
    return prev.sum.storyPoint > current.sum.storyPoint;
  }, []);

  const maxPoint = useMemo(() => {
    if (!storySummaries) return 0;
    const max = storySummaries.reduce((prev, current) =>
      compPoint(prev, current) ? prev : current
    ).sum.storyPoint;
    return max !== null ? max : 0;
  }, [compPoint, storySummaries]);

  const scopedStorySummaries: StorySummary[] = useMemo(() => {
    if (!storySummaries) return [];
    return storySummaries;
  }, [storySummaries]);

  const handleClick = (data: StorySummary) => {
    navigate({ search: `sprintId=${data.sprintId}` });
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
          {scopedStorySummaries.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.sprintId === sprintId ? "#8884d8" : "#D0BFFF"}
            />
          ))}
        </Bar>
      </BarChart>
    </Box>
  );
};
