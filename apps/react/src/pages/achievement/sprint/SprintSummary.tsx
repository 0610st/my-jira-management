import { Box, Flex } from "@mantine/core";
import { StoryPointResult } from "./StoryPointResult";
import { StoryPointsGraph } from "./StoryPointsGraph";

export const SprintSummary = () => {
  return (
    <Flex sx={{ flex: 1 }} gap={16}>
      <Box w={400} h={300}>
        <StoryPointResult sprintId={null} width={400} height={300} />
      </Box>
      <Box w={400} h={300}>
        <StoryPointsGraph sprintId={null} width={400} height={300} />
      </Box>
    </Flex>
  );
};
