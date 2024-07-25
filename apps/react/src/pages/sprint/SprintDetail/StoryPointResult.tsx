import { Text } from "@mantine/core";
import { FC, useMemo } from "react";
import { useStorySummaries } from "@/api/hooks";

interface Props {
  sprintId: number | null;
}

export const StoryPointResult: FC<Props> = ({ sprintId }) => {
  const { data: storySummaries } = useStorySummaries();

  const targetSprintPoint = useMemo(() => {
    if (!storySummaries) {
      return null;
    }
    return (
      storySummaries.body.find(
        (storySummary) => storySummary.sprintId === sprintId,
      )?.sum.storyPoint ?? null
    );
  }, [sprintId, storySummaries]);

  return (
    <>
      <Text component="span" size={40}>
        {targetSprintPoint || "-"}
      </Text>
      <Text component="span" size={20} ml="1ch">
        pt
      </Text>
    </>
  );
};
