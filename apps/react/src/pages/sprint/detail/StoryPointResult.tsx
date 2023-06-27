import { Box, Flex, Skeleton, Text } from "@mantine/core";
import { FC, useMemo } from "react";
import { useStorySummaries } from "../../../api/hooks";
import { StoryPointResultCompare } from "./StoryPointResultCompare";

interface Props {
  sprintId: number | null;
  width: number;
  height: number;
}

export const StoryPointResult: FC<Props> = ({ sprintId, width, height }) => {
  const { data: storySummaries } = useStorySummaries();

  const currentSprintIndex = useMemo(() => {
    if (!storySummaries) return -1;
    return storySummaries.findIndex(
      (storySummary) => storySummary.sprintId === sprintId
    );
  }, [storySummaries, sprintId]);

  const targetSprintPoint = useMemo(() => {
    if (!storySummaries || currentSprintIndex < 0) {
      return null;
    }
    return storySummaries[currentSprintIndex].sum.storyPoint;
  }, [storySummaries, currentSprintIndex]);

  const preSprintPoint = useMemo(() => {
    if (!storySummaries || currentSprintIndex < 1) {
      return null;
    }
    return storySummaries[currentSprintIndex - 1].sum.storyPoint;
  }, [storySummaries, currentSprintIndex]);

  const prepreSprintPoint = useMemo(() => {
    if (!storySummaries || currentSprintIndex < 2) {
      return null;
    }
    return storySummaries[currentSprintIndex - 2].sum.storyPoint;
  }, [storySummaries, currentSprintIndex]);

  if (!storySummaries) {
    return <Skeleton width={width} height={height} />;
  }

  return (
    <Flex w={width} h={height} direction="column">
      <Box sx={{ textAlign: "center" }}>
        <Text component="span" size={100}>
          {targetSprintPoint || "-"}
        </Text>
        <Text component="span" size={48}>
          pt
        </Text>
      </Box>
      <Flex>
        <StoryPointResultCompare
          from={prepreSprintPoint}
          to={targetSprintPoint}
          label="前々スプリント比"
        />
        <StoryPointResultCompare
          from={preSprintPoint}
          to={targetSprintPoint}
          label="前スプリント比"
        />
      </Flex>
    </Flex>
  );
};
