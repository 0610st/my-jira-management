import { Flex } from "@mantine/core";
import { EstimatedTimeTransition } from "./EstimatedTimeTransition";
import { StoryPointStack } from "./StoryPointStack";
import { StoryPointTransition } from "./StoryPointTransition";

export const Whole = () => (
  <Flex sx={{ flex: 1 }} justify="center">
    <Flex
      direction="column"
      sx={{
        maxWidth: "calc(100vw - 400px)",
        overflowX: "auto",
        overflowY: "hidden",
      }}
    >
      <StoryPointTransition />
      <StoryPointStack />
      <EstimatedTimeTransition />
    </Flex>
  </Flex>
);
