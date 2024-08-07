import { Skeleton } from "@mantine/core";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CategoricalChartState } from "recharts/types/chart/generateCategoricalChart";
import { useStorySummaries } from "@/api/hooks";
import { getAccumulatedSum } from "@/utils/util";
import { SprintLabelForGraph } from "@/components/SprintLabelForGraph";

export const StoryPointStack = () => {
  const { data: storySummaries } = useStorySummaries();
  const navigate = useNavigate();

  const accumulatedPoint = useMemo(() => {
    if (!storySummaries) return [];
    return getAccumulatedSum(
      storySummaries.body.map(
        (storySummary) => storySummary.sum.storyPoint || 0,
      ),
    );
  }, [storySummaries]);

  const graphData = useMemo(
    () =>
      storySummaries?.body.map((storySummary, index) => ({
        sprintId: storySummary.sprintId,
        point: accumulatedPoint[index],
      })),
    [storySummaries, accumulatedPoint],
  );

  const handleClick = (e: CategoricalChartState) => {
    navigate(`/sprint/${e.activeLabel ?? ""}`);
  };

  if (!storySummaries) {
    return <Skeleton width="100%" height={400} />;
  }

  return (
    <AreaChart
      height={400}
      width={Math.max(
        (storySummaries ? storySummaries.body.length : 0) * 50 + 100,
        600,
      )}
      data={graphData}
      onClick={handleClick}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="sprintId" tick={<SprintLabelForGraph />} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Area
        name="累積消化ポイント"
        type="monotone"
        dataKey="point"
        stroke="#8884d8"
      />
    </AreaChart>
  );
};
