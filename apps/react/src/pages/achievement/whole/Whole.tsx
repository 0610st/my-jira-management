import { Flex } from "@mantine/core";
import { EstimatedTimeTransition } from "./EstimatedTimeTransition";
import { StoryPointStack } from "./StoryPointStack";
import { StoryPointTransition } from "./StoryPointTransition";

export const Whole = () => (
  <Flex sx={{ flex: 1 }} direction="column" align="stretch" gap={16}>
    <StoryPointTransition />
    <StoryPointStack />
    <EstimatedTimeTransition />
  </Flex>
);
