import { Box, Text } from "@mantine/core";
import { FC } from "react";
import { ResultSummary } from "./ResultSummary";
import { SprintEpicSelectContainer } from "./SprintEpicSelectContainer";

interface SidebarProps {
  sprintName: string;
  sprintId: number;
}

export const Sidebar: FC<SidebarProps> = ({ sprintName, sprintId }) => {
  return (
    <Box w={300}>
      <Text fz="lg">{sprintName}</Text>
      <Box mt={8}>
        <ResultSummary />
      </Box>
      <Box mt={8}>
        <SprintEpicSelectContainer sprintId={sprintId} />
      </Box>
    </Box>
  );
};
