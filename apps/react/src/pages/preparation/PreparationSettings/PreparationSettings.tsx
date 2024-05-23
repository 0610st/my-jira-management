import { Box, Flex } from "@mantine/core";
import { StoryLabelMultiSelect } from "./StoryLabelMultiSelect";
import { TaskLabelMultiSelect } from "./TaskLabelMultiSelect";
import { TempTaskTable } from "./TempTaskTable/TempTaskTable";

export const PreparationSettings = () => (
  <Flex direction="column" sx={{ gap: 12 }}>
    <Flex sx={{ flex: 1, gap: 12 }}>
      <Box sx={{ flex: 1 }}>
        <StoryLabelMultiSelect />
      </Box>
      <Box sx={{ flex: 1 }}>
        <TaskLabelMultiSelect />
      </Box>
    </Flex>
    <Box sx={{ flex: 1 }}>
      <TempTaskTable />
    </Box>
  </Flex>
);
