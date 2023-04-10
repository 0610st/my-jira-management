import { Box, Flex } from "@mantine/core";
import { FC } from "react";
import { CountGraph } from "./CountGraph";
import { EstimatedTimeGraph } from "./EstimatedTimeGraph";

interface Props {
  sprintId: string | null;
}

export const MemberGraphs: FC<Props> = ({ sprintId }) => {
  return (
    <Flex sx={{ flex: 1 }} gap={16}>
      <Box w={400} h={300}>
        <EstimatedTimeGraph sprintId={sprintId} width={400} height={300} />
      </Box>
      <Box w={400} h={300}>
        <CountGraph sprintId={sprintId} width={400} height={300} />
      </Box>
    </Flex>
  );
};
