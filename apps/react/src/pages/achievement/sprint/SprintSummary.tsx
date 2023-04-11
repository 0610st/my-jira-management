import { Box, Flex } from "@mantine/core";
import { FC } from "react";
import { StoryPointResult } from "./StoryPointResult";
import { StoryPointsGraph } from "./StoryPointsGraph";

interface Props {
  sprintId: number | null;
}

export const SprintSummary: FC<Props> = ({ sprintId }) => {
  return (
    <Flex sx={{ flex: 1 }} gap={16}>
      <Box w={400} h={300}>
        <StoryPointResult sprintId={sprintId} width={400} height={300} />
      </Box>
      <Box w={400} h={300}>
        <StoryPointsGraph sprintId={sprintId} width={400} height={300} />
      </Box>
    </Flex>
  );
};
